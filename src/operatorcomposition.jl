
mutable struct OperatorComposition
    C::Crystal
    f::Expr
    OpDict::Dict # Symbol, Any
    sym::Function
end

"""
    OperatorComposition(f::Expr)

Constructs a struct OperatorComposition from an expression. All CrystalOperators
    are rewritten with respect to a single translationally invariance and normalized.
    Furthermore, it is checked if the expression is well-defined.

# Example
```jldoctest
julia> using ALFA

julia> L = ALFA.gallery.Laplace(N=1);

julia> f = :(inv(\$L)*\$L);

julia> oc = ALFA.OperatorComposition(f);

julia> ALFA.symbol(oc,[randn(1)]) ≈ [1] # as f is the identitity, the fourier transform is 1 for all frequencies.
true

```
"""
function OperatorComposition(f::Expr)
    f, dict = wrtSameLatticeAndNormalize(f)
    C = eval(f).C
    f_sym_k = (k; π = π) -> eval(MacroTools.postwalk(f) do x
        if x isa CrystalOperator
            symbol(x, k, π = π)
        else
            x
        end
    end)
    return OperatorComposition(C, f, dict, f_sym_k)
end


function _SimplifyAndApply(f::Expr, g::Function = (x) -> x)
    lookup = Dict()
    pulled = Dict()

    cnt = 0
    f2 = MacroTools.postwalk(f) do x
        if x isa CrystalOperator
            if x in keys(lookup)
                d_x = lookup[x]
            else
                d_x = Symbol(:var_, cnt, "_")
                get!(lookup, x, d_x)
                gx = g(x)
                get!(pulled, d_x, :($d_x = $gx))
                cnt += 1
            end
            d_x
        else
            x
        end
    end
    out = quote end
    append!(out.args, values(pulled))
    push!(out.args, f2)
    return out, pulled
end

function lcm(f::Expr)
    pulled = Dict()
    cnt = 0
    f2 = MacroTools.postwalk(f) do x
        if x isa CrystalOperator
            d_x = Symbol(:var_, cnt, "_")
            get!(pulled, d_x, x.C.L.A)
            cnt += 1
            nothing
        else
            nothing
        end
    end
    A = lcm(values(pulled)...)
end

function wrtSameLatticeAndNormalize(f::Expr)
    A = lcm(f)
    f2, mydict = _SimplifyAndApply(f, (x) -> wrtLattice(x, A, true))
end

for op in (:*, :+, :-)
    eval(quote
        Base.$op(a::Expr, b::Expr) = :($$op($a, $b))
    end)
end
