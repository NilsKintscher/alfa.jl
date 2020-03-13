

struct Lattice{N}
    A::MMatrix{N,N,Rational{BigInt}}
    function Lattice{N}(A::MMatrix{N,N,Rational{BigInt}}) where {N}
        @assert !isapprox(det(A), 0) "Basis must be nonsingular"
        new{N}(A)
    end
end

function Lattice{N}(mat = nothing) where {N}
    return Lattice(mat)
end

function Lattice(mat = nothing)
    if mat == nothing
        mat = MMatrix{2,2,Rational{BigInt}}(I) # identity matrix.
    elseif mat isa Matrix
        @assert size(mat, 1) == size(mat, 2) "Matrix must be square."
        mat = MMatrix{size(mat)...,Rational{BigInt}}(mat)
    elseif mat isa Real
        mat = MMatrix{1,1,Rational{BigInt}}(mat)
    elseif mat isa Vector
        mat = MMatrix{1,1,Rational{BigInt}}(mat...)
    else
        mat = convert(MMatrix{size(mat)...,Rational{BigInt}}, mat)
    end
    Lattice{size(mat, 1)}(mat)
end

Base.size(L::Lattice) = size(L.A)
Base.getindex(L::Lattice, y...) = getindex(L.A, y...)

function Base.getproperty(L::Lattice, sym::Symbol)
    if sym == :n || sym == :dim
        size(L.A, 1)
    elseif sym == :iA
        inv(L.A)
    elseif sym == :dA
        transpose(inv(L.A))
    else
        # fallback to getfield
        getfield(L, sym)
    end
end

"""
    lcm(A::Matrix,B::Matrix)

Returns the least common multiple of A and B, i.e. a sub-lattice C (C ⊂ A and C ⊂ B) with |det(C)| as small as possible.
"""
function Base.lcm(A, B) # TODO: ??? Change r to det(A) and test it with graphene lattice basis.
    M0 = inv(A) * B
    r = lcm(denominator.(M0))
    rM = r*M0
    S, U, V = snf_with_transform(rM)
    N = diagm(r ./ gcd.(diag(S), r))
    C = B * alfa.lll(V * N)
    return C
    # for r in range(1, stop = rmax)
    #     rM = r * M0
    #     rMr = round.(rM)
    #     if isapprox(rM, rMr, rtol = alfa_rtol, atol = alfa_atol)
    #         @show rMr
    #         # compute SNF
    #         S, U, V = snf_with_transform(rMr)
    #         N = diagm(r ./ gcd.(diag(S), r))
    #         # @show V
    #         # @show N
    #         # VN = V*N
    #         # @show V*N
    #         # lllVN = alfa.lll(VN)
    #         # @show lllVN
    #         C = B * alfa.lll(V * N)
    #         # @show C
    #         # return alfa.lll(C)
    #         return C
    #         break
    #     end
    # end
end

function Base.lcm(A::Lattice, B::Lattice, rmax = 1e+10)
    return Lattice(lcm(A.A, B.A))
end



function ElementsInQuotientSpace(
    A,
    B;
    return_diag_hnf::Bool = false,
    return_fractional::Bool = false,
) where {T}

    M = inv(A)*B
    Mr = round.(M)
    @assert isapprox(M, Mr, rtol = alfa_rtol, atol = alfa_atol) "A must be a sublattice of B, i.e. A\\B must be integral."
    H = hnf(Mr)
    dH = diag(H)
    m = prod(dH)
    J = Iterators.product([0:x-1 for x in dH]...)

    if return_fractional
        #s = Matrix{Int}(undef, length(J), length(dH))
        s = [SVector{length(dH),Int}(x) for x in J]
        # for (i,x) in enumerate(J)
        #     s[i,:] .= x
        # end
    else
        #
        s = [SVector{length(dH)}(A * [x...]) for x in J]
        # s = Matrix(undef, length(J), length(dH))
        # for (i,x) in enumerate(J)
        #     s[i,:] .= A*[x...]
        # end
    end
    if return_diag_hnf
        return vec(s), dH
    else
        return vec(s)
    end
end

function ShiftIntoUnitCell(s, A) # s vector of SVector
    # shift s into the unit cell and sort lexicographically.
    # Thus: A\snew[i] ∈ [0,1)
    y = [inv(A)* x for x in s]
    #@show y
    # for yy in y
    #     map!(
    #         x -> isapprox(x, round(x), rtol = alfa_rtol, atol = alfa_atol) ?
    #             round(x) : floor(x),
    #         yy,
    #         yy,
    #     ) # remove non-integral part ∈(0,1)
    # end
    y = [floor.(x) for x in y]
    Ay = [A * x for x in y]
    #transpose(A * transpose(y))
    s = s - Ay



    # sort lexicographically
    p = sortperm(s, alg = Base.Sort.DEFAULT_STABLE)
    s = s[p]
    y = y[p]
    return s, y, p # We now have s in the primitive cell of A (A*[0,1)^dim) and s is lexicographically ordered
end

function CheckIfNormal(s, A)
    (n,s,p) = ShiftIntoUnitCell(s,A)
    if s == 0*s && p == sort(p)
        return true
    end
    return false
end


function ShiftIntoUnitCell(s, A::Lattice)
    return ShiftIntoUnitCell(s, A.A)
end


function Base.:(==)(A::Lattice, B::Lattice)
     return A.A == B.A
end


function Base.:(≈)(A::Lattice, B::Lattice)
     return A.A ≈ B.A
end
