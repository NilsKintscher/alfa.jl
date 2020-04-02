var documenterSearchIndex = {"docs":
[{"location":"internals/internals/#Internals-1","page":"Internals","title":"Internals","text":"","category":"section"},{"location":"internals/internals/#","page":"Internals","title":"Internals","text":"Modules = [alfa]","category":"page"},{"location":"internals/internals/#alfa.Crystal-Union{Tuple{}, Tuple{Any}, Tuple{T}, Tuple{N}, Tuple{Any,Any}, Tuple{Any,Any,Any}} where T<:Union{Float64, Rational} where N","page":"Internals","title":"alfa.Crystal","text":"Crystal{N,T}(L = nothing, Domain = nothing, Codomain = nothing) where {N,T<:Union{Float64, Rational}}\n\nConstructs a Crystal{N,T} which respresents the domain and codomain of a CrystalOperator. It consists of a L::Lattice{N,T} and the structure elements Domain::Vector{SVector{N,T}} and Codomain::Vector{SVector{N,T}}.\n\nThis struct describes the set\n\nAℤ^N+s = left _i=0^n z_j  a_j + (s_1s_2ldotss_m)   z_j  ℤ  right\n\nwhere s=(s_1s_2ldotss_m)  textDomainCodomain is the structure element, A the lattice basis L.A.\n\nIn case of L==nothing, the identity I of size N is used.\nIn case of Domain==nothing, the origin 0 in mathbbR^N is used.\nIn case Codomain==nothing, Domain is used.\n\nExample\n\njulia> using alfa\n\njulia> alfa.Crystal{2,Float64}()\nLattice Basis: alfa.Lattice{2,Float64}([1.0 0.0; 0.0 1.0])\nDomain: 1-element Array{StaticArrays.SArray{Tuple{2},Float64,1,2},1}:\n [0.0, 0.0]\nCodomain: 1-element Array{StaticArrays.SArray{Tuple{2},Float64,1,2},1}:\n [0.0, 0.0]\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#alfa.CrystalOperator-Union{Tuple{T}, Tuple{N}, Tuple{alfa.Crystal{N,T},LinearAlgebra.UniformScaling}, Tuple{alfa.Crystal{N,T},LinearAlgebra.UniformScaling,Any}} where T where N","page":"Internals","title":"alfa.CrystalOperator","text":"CrystalOperator(\n    C::Crystal{N,T},\n    J::UniformScaling,\n    _CompatibilityCheckOnly = false,\n) where {N,T}\nCrystalOperator{N,T}(\n    C = nothing,\n    M = nothing,\n    _CompatibilityCheckOnly = false,\n) where {N,T<:Union{Float64,Rational}}\n\nConstructs a translationally invariant C::CrystalOperators{N,T}\n\nC  mathcalL(CL^textDomain) rightarrow mathcalL(CL^textCodomain)\n\nThe actual function definition (Cf)(x) is saved within C.M::SortedSet{Multiplier}:\n\n(Cf)(x) = sum_y in CM ytextmat  f(x+ytextpos) quad forall x in (CLA)mathbbZ^N\n\nExample\n\njulia> using alfa\n\njulia> using LinearAlgebra\n\njulia> alfa.CrystalOperator{2,Float64}()\nLattice Basis: alfa.Lattice{2,Float64}([1.0 0.0; 0.0 1.0])\nDomain: 1-element Array{StaticArrays.SArray{Tuple{2},Float64,1,2},1}:\n [0.0, 0.0]\nCodomain: 1-element Array{StaticArrays.SArray{Tuple{2},Float64,1,2},1}:\n [0.0, 0.0]\nMultiplier: 0-element Array{alfa.Multiplier,1}\n\njulia> alfa.CrystalOperator(alfa.Crystal{2,Float64}(),3*I)\nLattice Basis: alfa.Lattice{2,Float64}([1.0 0.0; 0.0 1.0])\nDomain: 1-element Array{StaticArrays.SArray{Tuple{2},Float64,1,2},1}:\n [0.0, 0.0]\nCodomain: 1-element Array{StaticArrays.SArray{Tuple{2},Float64,1,2},1}:\n [0.0, 0.0]\nMultiplier: 1-element Array{alfa.Multiplier,1}:\n alfa.Multiplier{2}([0, 0], [3])\n\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#alfa.Lattice-Union{Tuple{}, Tuple{Any}, Tuple{T}, Tuple{N}} where T<:Union{Float64, Rational} where N","page":"Internals","title":"alfa.Lattice","text":"Lattice{N,T}(A=nothing)\n\nConstruct a Lattice{N,T} with basis A, i.e., it represents the set\n\nAℤ^N = left _i=0^n z_j  a_j   z_j  ℤ right\n\nwhere a_j denotes the jth column of A. The matrix A must be square and nonsingular:\n\nA is called the lattice basis.\na_j are the primite vectors of the lattice.\n\nT<:Union{Float64,Rational} represents the datatype of the entries of the basis a_ij.\n\nIn case of A==nothing, the identity I of size N is used.\n\nExample\n\njulia> using alfa\n\njulia> L = alfa.Lattice{3,Float64}()\nalfa.Lattice{3,Float64}([1.0 0.0 0.0; 0.0 1.0 0.0; 0.0 0.0 1.0])\n\njulia> L = alfa.Lattice{2,Rational{BigInt}}()\nalfa.Lattice{2,Rational{BigInt}}(Rational{BigInt}[1//1 0//1; 0//1 1//1])\n\njulia> L = alfa.Lattice{2,Rational{BigInt}}([1 2; 3 4])\nalfa.Lattice{2,Rational{BigInt}}(Rational{BigInt}[1//1 2//1; 3//1 4//1])\n\njulia> L = alfa.Lattice{2,Rational{BigInt}}([1 2; 1 2])\nERROR: AssertionError: Basis must be nonsingular\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#alfa.Multiplier-Union{Tuple{}, Tuple{Any}, Tuple{N}, Tuple{Any,Any}} where N","page":"Internals","title":"alfa.Multiplier","text":"Multiplier{N}(pos = nothing, mat = nothing) where {N}\nMultiplier(pos = nothing, mat = nothing)\n\nConstructs a multiplication matrix as part of a CrystalOperator. The position is given in fractional coordinates and thus (converted to) integral.\n\nExample\n\njulia> using alfa\n\njulia> alfa.Multiplier([0 0], [1 2 3; 4 5 6])\nPosition: 2-element StaticArrays.MArray{Tuple{2},Int64,1,2} with indices SOneTo(2):\n 0\n 0\nMultiplier: 2×3 Array{Int64,2}:\n 1  2  3\n 4  5  6\n\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#alfa.OperatorComposition-Tuple{Expr}","page":"Internals","title":"alfa.OperatorComposition","text":"OperatorComposition(f::Expr)\n\nConstructs a struct OperatorComposition from an expression. All CrystalOperators     are rewritten with respect to a single translationally invariance and normalized.     Furthermore, it is checked if the expression is well-defined.\n\nExample\n\njulia> using alfa\n\njulia> L = alfa.gallery.Laplace(N=1);\n\njulia> f = :(inv($L)*$L);\n\njulia> oc = alfa.OperatorComposition(f);\n\njulia> alfa.symbol(oc,[randn(1)]) # as f is the identitity, the fourier transform is 1 for all frequencies.\n1×1 Array{Complex{Float64},2}:\n 1.0 + 0.0im\n\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#Base.:*-Union{Tuple{T}, Tuple{N}, Tuple{alfa.CrystalOperator{N,T},alfa.CrystalOperator{N,T}}} where T where N","page":"Internals","title":"Base.:*","text":"Base.:*(A::CrystalOperator{N,T}, B::CrystalOperator{N,T}) where {N,T}\n\nIf there is a least common multiple translationally invariance of A and B, then both operators A and B are rewritten wrt this translationally invariance A2 and B2. After that, it is checked if domain and codomain are compatible. If thats the case, the crystaloperator A2\\cdot B2 is constructed.\n\nA2cdot B2  mathcalL(B2CL^textDomain) rightarrow mathcalL(A2CL^textCodomain)\n\nwith\n\n(A2cdot B2cdot f)(x) = sum_a in A2M b in B2M atextmatcdot btextmat  f(x+atextpos+btextpos) quad forall x in (A2CLA)mathbbZ^N\n\nExample\n\njulia> using alfa\n\njulia> A = alfa.gallery.Laplace(N=1)\nLattice Basis: alfa.Lattice{1,Float64}([1.0])\nDomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\nCodomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\nMultiplier: 3-element Array{alfa.Multiplier,1}:\n alfa.Multiplier{1}([-1], [1.0])\n alfa.Multiplier{1}([0], [-2.0])\n alfa.Multiplier{1}([1], [1.0])\n\njulia> R = alfa.gallery.fw_restriction(N=1)\nLattice Basis: alfa.Lattice{1,Float64}([2.0])\nDomain: 2-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\n [1.0]\nCodomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\nMultiplier: 2-element Array{alfa.Multiplier,1}:\n alfa.Multiplier{1}([-1], Rational{Int64}[0//1 1//2])\n alfa.Multiplier{1}([0], Rational{Int64}[1//1 1//2])\n\njulia> R*A\nLattice Basis: alfa.Lattice{1,Float64}([2.0])\nDomain: 2-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\n [1.0]\nCodomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\nMultiplier: 3-element Array{alfa.Multiplier,1}:\n alfa.Multiplier{1}([-1], [0.5 0.0])\n alfa.Multiplier{1}([0], [-1.0 0.0])\n alfa.Multiplier{1}([1], [0.5 0.0])\n\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#Base.:*-Union{Tuple{T}, Tuple{T,alfa.CrystalOperator}} where T<:Number","page":"Internals","title":"Base.:*","text":"Base.:*(b::T, A::CrystalOperator) where {T<:Number}\nBase.:*(A::CrystalOperator{N,T}, b::S) where {N,T,S<:Number}\n\nConstructs a translationally invariant C::CrystalOperators{N,T}\n\nbcdot C  mathcalL(CL^textDomain) rightarrow mathcalL(CL^textCodomain)\n\nwith\n\n(bcdot Ccdot f)(x) = bcdot sum_y in CM ytextmat  f(x+ytextpos) quad forall x in (CLA)mathbbZ^N\n\nExample\n\njulia> using alfa\n\njulia> L = alfa.gallery.Laplace(N=1)\nLattice Basis: alfa.Lattice{1,Float64}([1.0])\nDomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\nCodomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\nMultiplier: 3-element Array{alfa.Multiplier,1}:\n alfa.Multiplier{1}([-1], [1.0])\n alfa.Multiplier{1}([0], [-2.0])\n alfa.Multiplier{1}([1], [1.0])\n\njulia> 2L\nLattice Basis: alfa.Lattice{1,Float64}([1.0])\nDomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\nCodomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\nMultiplier: 3-element Array{alfa.Multiplier,1}:\n alfa.Multiplier{1}([-1], [2.0])\n alfa.Multiplier{1}([0], [-4.0])\n alfa.Multiplier{1}([1], [2.0])\n\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#Base.:+-Union{Tuple{T}, Tuple{N}, Tuple{alfa.CrystalOperator{N,T},alfa.CrystalOperator{N,T}}} where T where N","page":"Internals","title":"Base.:+","text":"Base.:+(A::CrystalOperator{N,T}, B::CrystalOperator{N,T}) where {N,T}\n\nIf there is a least common multiple translationally invariance of A and B, then both operators A and B are rewritten wrt this translationally invariance A2 and B2. After that, it is checked if domain and codomain are compatible. If thats the case, the crystaloperator A2+t B2 is constructed.\n\nA2+B2  mathcalL(A2CL^textDomain) rightarrow mathcalL(A2CL^textCodomain)\n\nwith\n\n(A2+B2cdot f)(x) = (A2cdot f)(x) + (B2cdot f)(x) quad forall x in (A2CLA)mathbbZ^N\n\nExample\n\njulia> using alfa\n\njulia> A = alfa.gallery.Laplace(N=1)\nLattice Basis: alfa.Lattice{1,Float64}([1.0])\nDomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\nCodomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\nMultiplier: 3-element Array{alfa.Multiplier,1}:\n alfa.Multiplier{1}([-1], [1.0])\n alfa.Multiplier{1}([0], [-2.0])\n alfa.Multiplier{1}([1], [1.0])\n\njulia> A+A\nLattice Basis: alfa.Lattice{1,Float64}([1.0])\nDomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\nCodomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\nMultiplier: 3-element Array{alfa.Multiplier,1}:\n alfa.Multiplier{1}([-1], [2.0])\n alfa.Multiplier{1}([0], [-4.0])\n alfa.Multiplier{1}([1], [2.0])\n\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#Base.:/-Union{Tuple{T}, Tuple{alfa.CrystalOperator,T}} where T<:Number","page":"Internals","title":"Base.:/","text":"Base.:/(A::CrystalOperator, b::T) where {T<:Number}\n\nConstructs a translationally invariant C::CrystalOperators{N,T}\n\nCb  mathcalL(CL^textDomain) rightarrow mathcalL(CL^textCodomain)\n\nwith\n\n(Cbcdot f)(x) = frac1b sum_y in CM ytextmat  f(x+ytextpos) quad forall x in (CLA)mathbbZ^N\n\nExample\n\njulia> using alfa\n\njulia> L = alfa.gallery.Laplace(N=1)\nLattice Basis: alfa.Lattice{1,Float64}([1.0])\nDomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\nCodomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\nMultiplier: 3-element Array{alfa.Multiplier,1}:\n alfa.Multiplier{1}([-1], [1.0])\n alfa.Multiplier{1}([0], [-2.0])\n alfa.Multiplier{1}([1], [1.0])\n\njulia> L/2\nLattice Basis: alfa.Lattice{1,Float64}([1.0])\nDomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\nCodomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\nMultiplier: 3-element Array{alfa.Multiplier,1}:\n alfa.Multiplier{1}([-1], [0.5])\n alfa.Multiplier{1}([0], [-1.0])\n alfa.Multiplier{1}([1], [0.5])\n\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#Base.getindex-Tuple{alfa.Lattice,Vararg{Any,N} where N}","page":"Internals","title":"Base.getindex","text":"Base.getindex(L::Lattice, y...)\n\nsimply wrapping getindex(L.A, y...).\n\nExample\n\njulia> using alfa\n\njulia> L = alfa.Lattice{2,Float64}([1 2; 3 4])\nalfa.Lattice{2,Float64}([1.0 2.0; 3.0 4.0])\njulia> L[1,2] == L.A[1,2]\ntrue\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#Base.getproperty-Tuple{alfa.Lattice,Symbol}","page":"Internals","title":"Base.getproperty","text":"Base.getproperty(L::Lattice, sym::Symbol)\n\nGet properties of Lattice{N,T}. Let A=L.A, i.e., A  T^N  N, then\n\nL.n and L.dim return the dimension N.\nL.iA returns A^-1, i.e., the inverse of the lattice basis\nL.dA returns A^-T, i.e., the basis of the dual lattice.\n\nExample\n\njulia> using alfa\n\njulia> L = alfa.Lattice{2,Float64}([1 2; 3 4])\nalfa.Lattice{2,Float64}([1.0 2.0; 3.0 4.0])\njulia> L.n == L.dim == typeof(L).parameters[1] == 2\ntrue\njulia> L[2,1]\n3.0\njulia> L.iA == inv(L.A)\ntrue\njulia> L.dA == transpose(inv(L.A))\ntrue\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#Base.lcm-Union{Tuple{T}, Tuple{X}, Tuple{StaticArrays.MArray{X,T,N,L} where L where N,StaticArrays.MArray{X,T,N,L} where L where N}} where T<:Real where X","page":"Internals","title":"Base.lcm","text":"Base.lcm(A::MArray{X,T},B::MArray{X,T}...)\nBase.lcm(A::MArray{X,T}, B::MArray{X,T}...) where {X,T<:Rational}\n\nBase.lcm(A::Lattice{N,T}, B::Lattice{N,T}...) where {N,T}\nBase.lcm(A::MArray{X,T}, B::MArray{X,T}...) where {X,T<:Rational}\n\nReturns the least common multiple of A and B (or more), i.e. a sub-lattice C, that is C  A and C  B with det(C) as small as possible.\n\nExample\n\njulia> using alfa\n\njulia> L = alfa.Lattice{2,Float64}([1 2; 3 4])\nalfa.Lattice{2,Float64}([1.0 2.0; 3.0 4.0])\n\njulia> alfa.lcm(L) == L\ntrue\n\njulia> alfa.lcm(L.A) == L.A\ntrue\n\njulia> alfa.lcm(alfa.Lattice{1,Float64}([2]), alfa.Lattice{1,Float64}([3]), alfa.Lattice{1,Float64}([6]))\nalfa.Lattice{1,Float64}([6.0])\n\njulia> alfa.lcm(alfa.Lattice{2,Rational{BigInt}}([1 1; -1 1]), alfa.Lattice{2,Rational{BigInt}}([1 2; 2 1]))\nalfa.Lattice{2,Rational{BigInt}}(Rational{BigInt}[-3//1 1//1; -3//1 -1//1])\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#Base.push!","page":"Internals","title":"Base.push!","text":"Base.push!(S::CrystalOperator, m::Multiplier, add_to_existing = false)\n\nAdds a multiplier to S.M. If there is a multiplier m2 in S.M with m2.pos == m.pos, then\n\nm2 is replaced if add_to_existing == false\nm2.mat+m.mat is the new multiplier at m.pos if add_to_existing == true.\n\nExample\n\njulia> using alfa\n\njulia> S = alfa.gallery.Laplace()\nLattice Basis: alfa.Lattice{2,Float64}([1.0 0.0; 0.0 1.0])\nDomain: 1-element Array{StaticArrays.SArray{Tuple{2},Float64,1,2},1}:\n [0.0, 0.0]\nCodomain: 1-element Array{StaticArrays.SArray{Tuple{2},Float64,1,2},1}:\n [0.0, 0.0]\nMultiplier: 5-element Array{alfa.Multiplier,1}:\n alfa.Multiplier{2}([-1, 0], [1.0])\n alfa.Multiplier{2}([0, -1], [1.0])\n alfa.Multiplier{2}([0, 0], [-4.0])\n alfa.Multiplier{2}([0, 1], [1.0])\n alfa.Multiplier{2}([1, 0], [1.0])\n\njulia> m = alfa.Multiplier{2}([0, 0], [1])\nPosition: 2-element StaticArrays.MArray{Tuple{2},Int64,1,2} with indices SOneTo(2):\n 0\n 0\nMultiplier: 1×1 Array{Int64,2}:\n 1\n\njulia> push!(S,m)\nLattice Basis: alfa.Lattice{2,Float64}([1.0 0.0; 0.0 1.0])\nDomain: 1-element Array{StaticArrays.SArray{Tuple{2},Float64,1,2},1}:\n [0.0, 0.0]\nCodomain: 1-element Array{StaticArrays.SArray{Tuple{2},Float64,1,2},1}:\n [0.0, 0.0]\nMultiplier: 5-element Array{alfa.Multiplier,1}:\n alfa.Multiplier{2}([-1, 0], [1.0])\n alfa.Multiplier{2}([0, -1], [1.0])\n alfa.Multiplier{2}([0, 0], [1])\n alfa.Multiplier{2}([0, 1], [1.0])\n alfa.Multiplier{2}([1, 0], [1.0])\n\njulia> push!(S,m, true)\nLattice Basis: alfa.Lattice{2,Float64}([1.0 0.0; 0.0 1.0])\nDomain: 1-element Array{StaticArrays.SArray{Tuple{2},Float64,1,2},1}:\n [0.0, 0.0]\nCodomain: 1-element Array{StaticArrays.SArray{Tuple{2},Float64,1,2},1}:\n [0.0, 0.0]\nMultiplier: 5-element Array{alfa.Multiplier,1}:\n alfa.Multiplier{2}([-1, 0], [1.0])\n alfa.Multiplier{2}([0, -1], [1.0])\n alfa.Multiplier{2}([0, 0], [2])\n alfa.Multiplier{2}([0, 1], [1.0])\n alfa.Multiplier{2}([1, 0], [1.0])\n\n\n\n\n\n\n","category":"function"},{"location":"internals/internals/#Base.size-Tuple{alfa.Lattice}","page":"Internals","title":"Base.size","text":"Base.size(L::Lattice)\n\nReturns the dimension of the lattice basis: size(L.A,1).\n\nExample\n\njulia> using alfa\n\njulia> L = alfa.Lattice{2,Float64}([1 2; 3 4])\nalfa.Lattice{2,Float64}([1.0 2.0; 3.0 4.0])\njulia> size(L) == size(L.A) == (2,2)\ntrue\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#alfa.CheckIfNormal-Tuple{Any,Any}","page":"Internals","title":"alfa.CheckIfNormal","text":"CheckIfNormal(s, A)\n\nChecks if s is found within the primtive cell of A, i.e., A^-1s_j  01)^N and if s is sorted lexicographically.\n\nExample\n\njulia> using alfa\n\njulia> using LinearAlgebra\n\njulia> L = alfa.Lattice{2,Float64}([1 0; 0 1]);\n\njulia> s = [[-1/2,0], [1/4,2]]\n2-element Array{Array{Float64,1},1}:\n [-0.5, 0.0]\n [0.25, 2.0]\n\njulia>  alfa.CheckIfNormal(s,L)\nfalse\n\njulia> t = [[1/4,0], [1/2,0]]\n2-element Array{Array{Float64,1},1}:\n [0.25, 0.0]\n [0.5, 0.0]\n\njulia> alfa.CheckIfNormal(t,L)\ntrue\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#alfa.CleanUp!-Tuple{alfa.CrystalOperator}","page":"Internals","title":"alfa.CleanUp!","text":"CleanUp!(S::CrystalOperator)\n\nRemoves all multipliers m with norm(m.mat) == 0.\n\nExample\n\njulia> using alfa\n\njulia> using LinearAlgebra\n\njulia> S = alfa.CrystalOperator(alfa.Crystal{2,Float64}(),0*I)\nLattice Basis: alfa.Lattice{2,Float64}([1.0 0.0; 0.0 1.0])\nDomain: 1-element Array{StaticArrays.SArray{Tuple{2},Float64,1,2},1}:\n [0.0, 0.0]\nCodomain: 1-element Array{StaticArrays.SArray{Tuple{2},Float64,1,2},1}:\n [0.0, 0.0]\nMultiplier: 1-element Array{alfa.Multiplier,1}:\n alfa.Multiplier{2}([0, 0], [0])\n\njulia> alfa.CleanUp!(S)\n\njulia> S\nLattice Basis: alfa.Lattice{2,Float64}([1.0 0.0; 0.0 1.0])\nDomain: 1-element Array{StaticArrays.SArray{Tuple{2},Float64,1,2},1}:\n [0.0, 0.0]\nCodomain: 1-element Array{StaticArrays.SArray{Tuple{2},Float64,1,2},1}:\n [0.0, 0.0]\nMultiplier: 0-element Array{alfa.Multiplier,1}\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#alfa.ElementsInQuotientSpace-Union{Tuple{T}, Tuple{N}, Tuple{Union{Array{T,2}, StaticArrays.MArray{Tuple{N,N},T,2,L} where L},Union{Array{T,2}, StaticArrays.MArray{Tuple{N,N},T,2,L} where L}}} where T where N","page":"Internals","title":"alfa.ElementsInQuotientSpace","text":"ElementsInQuotientSpace(\n    A::Union{Matrix{T},MMatrix{N,N,T}},\n    B::Union{Matrix{T},MMatrix{N,N,T}};\n    return_diag_hnf::Bool = false,\n    return_fractional::Bool = false,\n) where {N,T}\n\nReturns all lattice points of the lattice generated by A found in the primitive cell of B, i.e.,\n\nT_AB=x  x  A mathbbZ^N cap B01)^N \n\nExample\n\njulia> using alfa\n\njulia> A = alfa.Lattice{2,Float64}([1 0; 0 1]);\n\njulia> B = alfa.Lattice{2,Float64}([2 0; 0 2]);\n\njulia> alfa.ElementsInQuotientSpace(A.A,B.A)\n4-element Array{StaticArrays.SArray{Tuple{2},Float64,1,2},1}:\n [0.0, 0.0]\n [1.0, 0.0]\n [0.0, 1.0]\n [1.0, 1.0]\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#alfa.ShiftIntoStandardCell-Union{Tuple{T}, Tuple{N}, Tuple{Any,Union{Array{T,2}, StaticArrays.MArray{Tuple{N,N},T,2,L} where L}}} where T where N","page":"Internals","title":"alfa.ShiftIntoStandardCell","text":"ShiftIntoStandardCell(s, A::Union{Matrix{T},MMatrix{N,N,T}}) where {N,T}\nShiftIntoStandardCell(s, A::Union{Matrix{T},MMatrix{N,N,T}}) where {N,T<:Rational}\nShiftIntoStandardCell(s, A::Lattice)\n\nShifts all elements s[i] into the primitive cell A01)^N and sort the entries lexicographically. The function returns t, y, p, such that\n\nt_j + A y_j = s_p(j)\n\nt is the shifted vector s, i.e., A^-1t_j  01)^N for all j.\np is the permutation with respect to the input s.\ny corresponds to the shift in fractional coordinates.\n\nExample\n\njulia> using alfa\n\njulia> using LinearAlgebra\n\njulia> L = alfa.Lattice{2,Float64}([1 0; 0 1]);\n\njulia> s = [[-1/2,0], [1/4,2]]\n2-element Array{Array{Float64,1},1}:\n [-0.5, 0.0]\n [0.25, 2.0]\n\njulia> (t, y, p) = alfa.ShiftIntoStandardCell(s,L);\n\njulia> t\n2-element Array{StaticArrays.SArray{Tuple{2},Float64,1,2},1}:\n [0.25, 0.0]\n [0.5, 0.0]\n\njulia> y\n2-element Array{StaticArrays.MArray{Tuple{2},Float64,1,2},1}:\n [0.0, 2.0]\n [-1.0, 0.0]\n\njulia> p\n2-element Array{Int64,1}:\n 2\n 1\n\njulia> [t[j] + L.A*y[j] - s[p[j]] for j in [1,2]]\n2-element Array{StaticArrays.SArray{Tuple{2},Float64,1,2},1}:\n [0.0, 0.0]\n [0.0, 0.0]\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#alfa.compute_spectrum-Union{Tuple{X}, Tuple{X}} where X<:Union{alfa.OperatorComposition, alfa.CrystalOperator}","page":"Internals","title":"alfa.compute_spectrum","text":"compute_spectrum(S::X; N = 20, by = abs) where {X<:Union{CrystalOperator,OperatorComposition}}\n\nReturns a dataframe with the eigenvalues of the symbol of a CrystalOperator/OperatorComposition. The Frequency space is divided into N^dim equidistant (unique) points frequencies k.\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#alfa.eigen-Union{Tuple{X}, Tuple{X,Any}} where X<:Union{alfa.OperatorComposition, alfa.CrystalOperator}","page":"Internals","title":"alfa.eigen","text":"eigen(S::X, k; by = abs) where {X<:Union{CrystalOperator,OperatorComposition}}\n\nComputes the eigenvalues and eigenvectors of the symbol of a CrystalOperator/OperatorComposition wrt frequency k.\n\nThe eigenvalues are sorted by by.\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#alfa.eigvals-Union{Tuple{X}, Tuple{T}, Tuple{X,T}} where X<:Union{alfa.OperatorComposition, alfa.CrystalOperator} where T<:Union{Tuple, AbstractArray{T,1} where T}","page":"Internals","title":"alfa.eigvals","text":"eigvals(\n    S::X,\n    k::T;\n    by = abs,\n) where {\n    T<:Union{AbstractVector,Tuple},\n    X<:Union{CrystalOperator,OperatorComposition},\n}\n\nComputes the eigenvalues of the symbol of a CrystalOperator/OperatorComposition wrt frequency k.\n\nThe eigenvalues are sorted by by.\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#alfa.eigvals-Union{Tuple{X}, Tuple{X}} where X<:Union{alfa.OperatorComposition, alfa.CrystalOperator}","page":"Internals","title":"alfa.eigvals","text":"eigvals(\n    S::X;\n    N = 20,\n    by = abs,\n    unique = false,\n    digits = 5,\n) where {X<:Union{CrystalOperator,OperatorComposition}}\n\nComputes the eigenvalues of the symbol of a CrystalOperator/OperatorComposition. The Frequency space is divided into N^dim equidistant (unique) points frequencies k.\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#alfa.find_multiplier-Tuple{alfa.CrystalOperator,Any}","page":"Internals","title":"alfa.find_multiplier","text":"find_multiplier(S::CrystalOperator, pos)\n\nReturns the multiplier at pos if existent (in S.M).\n\nExample\n\njulia> using alfa\n\njulia> S = alfa.gallery.Laplace()\nLattice Basis: alfa.Lattice{2,Float64}([1.0 0.0; 0.0 1.0])\nDomain: 1-element Array{StaticArrays.SArray{Tuple{2},Float64,1,2},1}:\n [0.0, 0.0]\nCodomain: 1-element Array{StaticArrays.SArray{Tuple{2},Float64,1,2},1}:\n [0.0, 0.0]\nMultiplier: 5-element Array{alfa.Multiplier,1}:\n alfa.Multiplier{2}([-1, 0], [1.0])\n alfa.Multiplier{2}([0, -1], [1.0])\n alfa.Multiplier{2}([0, 0], [-4.0])\n alfa.Multiplier{2}([0, 1], [1.0])\n alfa.Multiplier{2}([1, 0], [1.0])\n\njulia> alfa.find_multiplier(S, [0, 0])\nPosition: 2-element StaticArrays.MArray{Tuple{2},Int64,1,2} with indices SOneTo(2):\n 0\n 0\nMultiplier: 1×1 Array{Float64,2}:\n -4.0\n\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#alfa.hnf-Union{Tuple{StaticArrays.MArray{Tuple{M,N},T,2,L} where L where T}, Tuple{N}, Tuple{M}} where N where M","page":"Internals","title":"alfa.hnf","text":"hnf(mat::MMatrix{M,N}) where {M, N}\nhnf(mat::Matrix)\n\nWrapper of Nemo.hnf. Input is converted to BigInt. Returns H = mat*U, s.t. H is in Hermite Normal Form and U is unimodular.\n\nExample\n\njulia> using alfa # hide\n\njulia> using LinearAlgebra # hide\n\njulia> mat = rand(1:1000, 2, 2);\n\njulia> H = alfa.hnf(mat);\n\njulia> norm(LinearAlgebra.tril(H) - H) ≈ 0\ntrue\njulia> round(abs(det(inv(mat)*H)), digits=5)\n1.0\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#alfa.lll-Union{Tuple{StaticArrays.MArray{Tuple{M,N},T,2,L} where L where T}, Tuple{N}, Tuple{M}} where N where M","page":"Internals","title":"alfa.lll","text":"lll(mat::MMatrix{M,N}) where {M, N}\nlll(mat::Matrix)\n\nWrapper of Nemo.lll. Input is converted to BigInt. Applies the LLL-Algorithm to the input mat. Computes output L, such that mat*T=L for some unimodular T.\n\nExample\n\njulia> using alfa # hide\n\njulia> using LinearAlgebra # hide\n\njulia> mat = rand(1:1000, 2, 2);\n\njulia> L = alfa.lll(mat);\n\njulia> round(abs(det(inv(mat)*L)), digits=5)\n1.0\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#alfa.normalize-Union{Tuple{alfa.CrystalOperator{N,T}}, Tuple{T}, Tuple{N}} where T where N","page":"Internals","title":"alfa.normalize","text":"normalize(S::CrystalOperator{N,T}) where {N,T}\n\nNormalizes the crystaloperator, i.e., returns an crystaloperator isomorphic to S where all structure elements are shifted in the standard cell SCLAcdot01)^N and sorted lexicographically.\n\nExample\n\njulia> using alfa\n\njulia> S = alfa.CrystalOperator{1,Float64}(alfa.Crystal{1,Float64}([1], [-.5], [1.5]))\nLattice Basis: alfa.Lattice{1,Float64}([1.0])\nDomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [-0.5]\nCodomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [1.5]\nMultiplier: 0-element Array{alfa.Multiplier,1}\n\njulia> push!(S, alfa.Multiplier([0], [-2]))\nLattice Basis: alfa.Lattice{1,Float64}([1.0])\nDomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [-0.5]\nCodomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [1.5]\nMultiplier: 1-element Array{alfa.Multiplier,1}:\n alfa.Multiplier{1}([0], [-2])\n\njulia> alfa.normalize(S)\nLattice Basis: alfa.Lattice{1,Float64}([1.0])\nDomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.5]\nCodomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.5]\nMultiplier: 1-element Array{alfa.Multiplier,1}:\n alfa.Multiplier{1}([-2], [-2])\n\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#alfa.normalize-Union{Tuple{alfa.Crystal{N,T}}, Tuple{T}, Tuple{N}} where T where N","page":"Internals","title":"alfa.normalize","text":"normalize(C::Crystal{N,T}) where {N,T}\n\nNormalizes the crystal, i.e., shifts the structure elements Domain and Codomain into the standard primitive cell.\n\nExample\n\njulia> using alfa\n\njulia> C = alfa.Crystal{1,Float64}([2], [[-1],[-.5],[-1.5]], [[0]])\nLattice Basis: alfa.Lattice{1,Float64}([2.0])\nDomain: 3-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [-1.0]\n [-0.5]\n [-1.5]\nCodomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\n\njulia> alfa.normalize(C)\nLattice Basis: alfa.Lattice{1,Float64}([2.0])\nDomain: 3-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.5]\n [1.0]\n [1.5]\nCodomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\n\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#alfa.snf_with_transform-Union{Tuple{StaticArrays.MArray{Tuple{M,N},T,2,L} where L where T}, Tuple{N}, Tuple{M}} where N where M","page":"Internals","title":"alfa.snf_with_transform","text":"snf_with_transform(L::Lattice)\nsnf_with_transform(mat::MMatrix{M,N}) where {M,N}\nsnf_with_transform(mat::Matrix)\n\nWrapper of Nemo.snfwithtransform. Input is converted to BigInt. Returns (S,U,V) such that UmatV = S, where S is the Smith normal form of mat.\n\nExample\n\njulia> using alfa # hide\n\njulia> using LinearAlgebra # hide\n\njulia> mat = rand(1:10, 10, 10);\n\njulia> (S,U,V) = alfa.snf_with_transform(mat);\n\njulia> norm(U*mat*V - S) ≈ 0\ntrue\n\njulia> abs(det(U)) ≈ abs(det(V)) ≈ 1\ntrue\n\njulia> norm(diagm(diag(S)) - S) ≈ 0\ntrue\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#alfa.symbol-Tuple{alfa.CrystalOperator,Any}","page":"Internals","title":"alfa.symbol","text":"symbol(S::CrystalOperator, k; π = π)\nsymbol(O::OperatorComposition, k; π = π)\n\nReturns the symbol of the CrystalOperator/OperatorComposition for a given frequency/wavevector k.\n\nExample\n\njulia> using alfa\n\njulia> L = alfa.gallery.Laplace(N=2);\n\njulia> oc = alfa.OperatorComposition(:(3*$L));\n\njulia> alfa.symbol(oc,[0.5, 0.5]) # as f is the identitity, the fourier transform is 1 for all frequencies.\n1×1 Array{Complex{Float64},2}:\n -24.0 + 0.0im\n\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#alfa.wrtLattice-Union{Tuple{T}, Tuple{N}, Tuple{alfa.CrystalOperator{N,T},Any}, Tuple{alfa.CrystalOperator{N,T},Any,Any}} where T where N","page":"Internals","title":"alfa.wrtLattice","text":"wrtLattice(\n    S::CrystalOperator{N,T},\n    A,\n    _CompatibilityCheckOnly = false,\n) where {N,T}\n\nRewrites the crystaloperator S wit hrespect to the translationally invariance A.\n\nExample\n\njulia> using alfa\n\njulia> L = alfa.gallery.Laplace(N=1)\nLattice Basis: alfa.Lattice{1,Float64}([1.0])\nDomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\nCodomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\nMultiplier: 3-element Array{alfa.Multiplier,1}:\n alfa.Multiplier{1}([-1], [1.0])\n alfa.Multiplier{1}([0], [-2.0])\n alfa.Multiplier{1}([1], [1.0])\n\njulia> alfa.wrtLattice(L, L.C.L.A*2)\nLattice Basis: alfa.Lattice{1,Float64}([2.0])\nDomain: 2-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\n [1.0]\nCodomain: 2-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\n [1.0]\nMultiplier: 3-element Array{alfa.Multiplier,1}:\n alfa.Multiplier{1}([-1], [0.0 1.0; 0.0 0.0])\n alfa.Multiplier{1}([0], [-2.0 1.0; 1.0 -2.0])\n alfa.Multiplier{1}([1], [0.0 0.0; 1.0 0.0])\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#alfa.wrtLattice-Union{Tuple{T}, Tuple{N}, Tuple{alfa.Crystal{N,T},Any}} where T where N","page":"Internals","title":"alfa.wrtLattice","text":"wrtLattice(C::Crystal, L::Lattice)\nwrtLattice(C::Crystal{N,T}, A) where {N,T}\n\nRewrites the crystal with respect to L::Lattice or lattice basis A. Thus, the lattice must be a sublattice of C.L.\n\nExample\n\njulia> using alfa\n\njulia> using LinearAlgebra\n\njulia> C = alfa.Crystal{2,Float64}()\nLattice Basis: alfa.Lattice{2,Float64}([1.0 0.0; 0.0 1.0])\nDomain: 1-element Array{StaticArrays.SArray{Tuple{2},Float64,1,2},1}:\n [0.0, 0.0]\nCodomain: 1-element Array{StaticArrays.SArray{Tuple{2},Float64,1,2},1}:\n [0.0, 0.0]\n\njulia> L = alfa.Lattice{2,Float64}(2*I)\nalfa.Lattice{2,Float64}([2.0 0.0; 0.0 2.0])\n\njulia> alfa.wrtLattice(C,L)\nLattice Basis: alfa.Lattice{2,Float64}([2.0 0.0; 0.0 2.0])\nDomain: 4-element Array{StaticArrays.SArray{Tuple{2},Float64,1,2},1}:\n [0.0, 0.0]\n [1.0, 0.0]\n [0.0, 1.0]\n [1.0, 1.0]\nCodomain: 4-element Array{StaticArrays.SArray{Tuple{2},Float64,1,2},1}:\n [0.0, 0.0]\n [1.0, 0.0]\n [0.0, 1.0]\n [1.0, 1.0]\n\n\n\n\n\n\n","category":"method"},{"location":"internals/internals/#alfa.wrtSameLatticeAndNormalize-Tuple{alfa.CrystalOperator,alfa.CrystalOperator}","page":"Internals","title":"alfa.wrtSameLatticeAndNormalize","text":"wrtSameLatticeAndNormalize(A::CrystalOperator, B::CrystalOperator)\n\nFinds a least common multiple translationally invariance C and rewrites both operators A and B wrt C and normalizes the Operators.\n\nExample\n\njulia> using alfa\n\njulia> A = alfa.gallery.Laplace(N=1)\nLattice Basis: alfa.Lattice{1,Float64}([1.0])\nDomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\nCodomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\nMultiplier: 3-element Array{alfa.Multiplier,1}:\n alfa.Multiplier{1}([-1], [1.0])\n alfa.Multiplier{1}([0], [-2.0])\n alfa.Multiplier{1}([1], [1.0])\n\njulia> B = alfa.gallery.fw_restriction(N=1)\nLattice Basis: alfa.Lattice{1,Float64}([2.0])\nDomain: 2-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\n [1.0]\nCodomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\nMultiplier: 2-element Array{alfa.Multiplier,1}:\n alfa.Multiplier{1}([-1], Rational{Int64}[0//1 1//2])\n alfa.Multiplier{1}([0], Rational{Int64}[1//1 1//2])\n\njulia> (A2,B2) = alfa.wrtSameLatticeAndNormalize(A,B);\n\njulia> A2\nLattice Basis: alfa.Lattice{1,Float64}([2.0])\nDomain: 2-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\n [1.0]\nCodomain: 2-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\n [1.0]\nMultiplier: 3-element Array{alfa.Multiplier,1}:\n alfa.Multiplier{1}([-1], [0.0 1.0; 0.0 0.0])\n alfa.Multiplier{1}([0], [-2.0 1.0; 1.0 -2.0])\n alfa.Multiplier{1}([1], [0.0 0.0; 1.0 0.0])\n\njulia> B2\nLattice Basis: alfa.Lattice{1,Float64}([2.0])\nDomain: 2-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\n [1.0]\nCodomain: 1-element Array{StaticArrays.SArray{Tuple{1},Float64,1,1},1}:\n [0.0]\nMultiplier: 2-element Array{alfa.Multiplier,1}:\n alfa.Multiplier{1}([-1], Rational{Int64}[0//1 1//2])\n alfa.Multiplier{1}([0], Rational{Int64}[1//1 1//2])\n\n\n\n\n\n","category":"method"},{"location":"internals/gallery/#Gallery-1","page":"Gallery","title":"Gallery","text":"","category":"section"},{"location":"internals/gallery/#","page":"Gallery","title":"Gallery","text":"Pages = [\"gallery.md\"]","category":"page"},{"location":"internals/gallery/#","page":"Gallery","title":"Gallery","text":"Modules = [alfa.gallery]","category":"page"},{"location":"internals/gallery/#alfa.gallery.Laplace-Tuple{}","page":"Gallery","title":"alfa.gallery.Laplace","text":"Laplace(;N = 2, h=1, T = Float64)\n\nCreates a CrystalOperator corresponding to the (central differences) discretization of the Laplace operator Δ=sum_j fracpartial^2partial x_j^2in N dimensions.\n\nh corresponds to the distance of the grid points.\n\n\n\n\n\n","category":"method"},{"location":"internals/gallery/#alfa.gallery.fw_restriction-Tuple{}","page":"Gallery","title":"alfa.gallery.fw_restriction","text":"fw_restriction(;m=1, N = 2, T = Float64)\n\nFull weighting restriction operator in N dimensions.\n\n\n\n\n\n","category":"method"},{"location":"#alfa.jl-1","page":"Home","title":"alfa.jl","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Hallo, test 123","category":"page"}]
}
