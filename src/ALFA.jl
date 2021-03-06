module ALFA

using LinearAlgebra
using StaticArrays
import Nemo
import DataStructures: SortedSet, SortedDict
using RecipesBase
using ColorSchemes
using DataFrames
using MacroTools
using Formatting
import Base.lcm



include("utils.jl")
include("nemo_wrapper.jl")
include("lattice.jl")
include("crystal.jl")
include("multiplier.jl")
include("crystaloperator.jl")
include("operatorcomposition.jl")
include("analysis.jl")
include("gallery.jl")
include("show.jl")
include("plotrecipes.jl")

end # module
