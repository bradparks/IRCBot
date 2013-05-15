// Brian Cain
// Based off the code found at:
//      http://www.theproofistrivial.com/

exports.getProof = getProof;

var start =
    [
    "Just biject it to a",
    "Just view the problem as a",
    ];

var first =
    [
    "abelian",
    "associative",
    "computable",
    "Lebesgue-measurable",
    "semi-decidable",
    "simple",
    "combinatorial",
    "structure-preserving",
    "diagonalizable",
    "nonsingular",
    "orientable",
    "twice-differentiable",
    "thrice-differentiable",
    "countable",
    "prime",
    "complete",
    "continuous",
    "trivial",
    "3-connected",
    "bipartite",
    "planar",
    "finite",
    "nondeterministic",
    "alternating",
    "convex",
    "undecidable",
    "dihedral",
    "context-free",
    "rational",
    "regular",
    "Noetherian",
    "Cauchy",
    "open",
    "closed",
    "compact",
    "clopen",
    "pointless"
    ];

var second =
    [
    ["multiset", "multisets", true],
    ["integer", "integers", false],
    ["metric space", "metric spaces", true],
    ["group", "groups", true],
    ["monoid", "monoids", true],
    ["semigroup", "semigroups", true],
    ["ring", "rings", true],
    ["field", "fields", true],
    ["module", "modules", true],
    ["Turing machine", "Turing machines", false],
    ["topological space", "topological spaces", true],
    ["automorphism", "automorphisms", false],
    ["bijection", "bijections", false],
    ["DAG", "DAGs", false],
    ["generating function", "generating functions", false],
    ["taylor series", "taylor series", false],
    ["Hilbert space", "Hilbert spaces", true],
    ["linear transformation", "linear transformations", false],
    ["manifold", "manifolds", true],
    ["hypergraph", "hypergraphs", true],
    ["pushdown automaton", "pushdown automata", false],
    ["combinatorial game", "combinatorial games", false],
    ["residue class", "residue classes", true],
    ["equivalence relation", "equivalence relations", false],
    ["logistic system", "logistic systems", true],
    ["tournament", "tournaments", false],
    ["random variable", "random variables", false],
    ["complexity class", "complexity classes", true],
    ["triangulation", "triangulations", false],
    ["unbounded-fan-in circuit", "unbounded-fan-in circuits", false],
    ["log-space reduction", "log-space reductions", false],
    ["language", "languages", true],
    ["poset", "posets", true],
    ["algebra", "algebras", true],
    ["Markov chain", "Markov chains", false],
    ["4-form", "4-forms", false],
    ["7-chain", "7-chains", false],
    ];

function randomStart()
{
    var ind = Math.floor(Math.random() * start.length);
    return start[ind];
}

function randomFirst()
{
    var ind = Math.floor(Math.random() * first.length);
    return first[ind];
}

function randomSecond()
{
    var ind = Math.floor(Math.random() * second.length);
    while (!second[ind][2]){
        ind = Math.floor(Math.random() * second.length);
    }
    return second[ind][0];
}

function getfirstInd()
{
    var firstInd = Math.floor(Math.random() * first.length);
    return firstInd;
}

function getaddn(firstInd)
{
    var addn = (first[firstInd][0] == "a" ||
                first[firstInd][0] == "e" ||
                first[firstInd][0] == "i" ||
                first[firstInd][0] == "o" ||
                first[firstInd][0] == "u");
    return addn;
}

function getProof()
{
    var firstInd = getfirstInd();
    var addn = getaddn(firstInd);
    var theproof = "The proof is trivial! " + randomStart() + (addn ? "n" : "") + " " + first[firstInd] + " " + randomSecond();
    return theproof;
}

function Test()
{
    return "This is a test";
}
