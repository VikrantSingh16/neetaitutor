import React, { useEffect, useState } from "react";
import Image from "next/image";

import Tutor from "../assets/aitutor.png";
import logo from "../assets/livelogo.png";
import Notes from '../components/LiveBotNotes'
import Home from '../components/LiveBotHome'
import SidebarLiveBot from "./SidebarLiveBot";
import SidebarHead from "./SidebarHead";
import History from './LiveBotHistory'
import Study from './LiveBotStudy'
import axios from 'axios'
import { useRouter } from "next/router";
const LiveBot = () => {
  const [mstatus, msetStatus] = useState("m1");
  const router = useRouter();
  const [loader,setLoader]=useState(false)
  const [loggedIn, setLoggedIn] = useState(false);


  const [isStandardSelected, setIsStandardSelected] = useState(false);
  const [isYearSelected, setIsYearSelected] = useState(false);

  const [isChemistryQuestionSelected, setIsChemistryQuestionSelected] = useState(false);
  const [isPhysicsQuestionSelected, setIsPhysicsQuestionSelected] = useState(false);


  const [isBiologyQuestionSelected, setIsBiologyQuestionSelected] = useState(false);


  const [sessionStarted, setSessionStarted] = useState(false);

  const startSession = () => {
    setSessionStarted(true);
    setTimeout(() => {
    
      alert(`Today's Session has completed you can come back tommorow or else you can continue the topic...`)
      
    }, 3600000); 
  };
  const [data,setData]=useState([])
  const [chemistry,setChemistry]=useState([])
  const [physics,setPhysics]=useState([])
  const [biology,setBiology]=useState([])
  const [chemistryChapter,setChemistryChapter]=useState([])
  const [physicsChapter,setPhysicsChapter]=useState([])
  const [biologyChapter,setBiologyChapter]=useState([])
  const [selectSubject,setSelectSubject] = useState('physics')
  const [selectChapter,setSelectChapter]=useState('Work, Energy and Power')
  const[topicIndex,setTopicIndex]=useState(0)
  const [topicName,setTopicNames]=useState([
    'Work',
'Introduction',
'Notions of work and kinetic energy: the work-energy theorem',
'Kinetic energy',
'Work done by a variable force',
'The work-energy theorem for a variable force',
'The concept of potential energy',
'the conservation of mechanical energy',
'The potential energy of a spring',
'Various forms of energy : the law of conservation of energy',
'Power',
'Collisions',
  ])
 const [chemistryQuestion,setChemistryQuestion]=useState('')
 const [biologyQuestion,setBiologyQuestion]=useState('')
 const [physicsQuestion,setPhysicsQuestion]=useState('')
const [userLoader,setUserLoader]=useState(true)
  const extractTopicNames = (chapterName) => {
    // Filter data for the specific chapter
    const chapterData = data.filter(entry => entry.chapter_name === chapterName);
  
    // Extract topic names from the filtered data
    const topicNames = chapterData.map(entry => entry.topic_name);
    setTopicNames(topicNames)
    
  };

  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    const no = localStorage.getItem("NUMBER");
    const nam = localStorage.getItem("USER_NAME");
    console.log(nam);
    setName(nam)
    setNum(no);
  }, []);
  useEffect(() => {
    const handleGetTutor = async () => {
      try {
   
        const response = await axios.get('/api/createLiveTutorUser', {
          params: {
            phone: localStorage.getItem("NUMBER"),
          },
        });
        setUserLoader(false)
          setBot(true)
          
       
        console.log('Tutor data:', response.data);
        
      } catch (error) {
        setUserLoader(false)

        setLoader(false)
        console.error('Error fetching tutor:', error);
      }
    };
   // const data = [
    //   {"section":"section-532","chapter_name":"The Living World","topic_name":"What is ‘Living’?","subject":"botany"},{"section":"section-533","chapter_name":"The Living World","topic_name":"Diversity in the Living World","subject":"botany"},{"section":"section-534","chapter_name":"The Living World","topic_name":"Taxonomic Categories","subject":"botany"},{"section":"section-535","chapter_name":"The Living World","topic_name":"Taxonomical Aids","subject":"botany"},{"section":"section-536","chapter_name":"Biological Classification","topic_name":"Kingdom Monera","subject":"botany"},{"section":"section-537","chapter_name":"Biological Classification","topic_name":"Kingdom Protista","subject":"botany"},{"section":"section-538","chapter_name":"Biological Classification","topic_name":"Kingdom Fungi","subject":"botany"},{"section":"section-539","chapter_name":"Biological Classification","topic_name":"Kingdom Plantae","subject":"botany"},{"section":"section-540","chapter_name":"Biological Classification","topic_name":"Kingdom Animalia","subject":"botany"},{"section":"section-541","chapter_name":"Biological Classification","topic_name":"Viruses, Viroids, Prions and Lichens","subject":"botany"},{"section":"section-542","chapter_name":"Plant Kingdom","topic_name":"Algae","subject":"botany"},{"section":"section-543","chapter_name":"Plant Kingdom","topic_name":"Bryophytes","subject":"botany"},{"section":"section-544","chapter_name":"Plant Kingdom","topic_name":"Pteridophytes","subject":"botany"},{"section":"section-545","chapter_name":"Plant Kingdom","topic_name":"Gymnosperms","subject":"botany"},{"section":"section-546","chapter_name":"Plant Kingdom","topic_name":"Angiosperms","subject":"botany"},{"section":"section-547","chapter_name":"Plant Kingdom","topic_name":"Plant Life Cycles and Alternation of Generations","subject":"botany"},{"section":"section-550","chapter_name":"Morphology of Flowering Plants","topic_name":"The Root","subject":"botany"},{"section":"section-551","chapter_name":"Morphology of Flowering Plants","topic_name":"The Stem","subject":"botany"},{"section":"section-552","chapter_name":"Morphology of Flowering Plants","topic_name":"The Leaf","subject":"botany"},{"section":"section-553","chapter_name":"Morphology of Flowering Plants","topic_name":"The Inflorescence","subject":"botany"},{"section":"section-554","chapter_name":"Morphology of Flowering Plants","topic_name":"The Flower","subject":"botany"},{"section":"section-555","chapter_name":"Morphology of Flowering Plants","topic_name":"The Fruit","subject":"botany"},{"section":"section-556","chapter_name":"Morphology of Flowering Plants","topic_name":"The Seed","subject":"botany"},{"section":"section-557","chapter_name":"Morphology of Flowering Plants","topic_name":"Semi-technical Description of a Typical Flowering Plant","subject":"botany"},{"section":"section-558","chapter_name":"Morphology of Flowering Plants","topic_name":"Description of Some Important Families","subject":"botany"},{"section":"section-559","chapter_name":"Anatomy of Flowering Plants","topic_name":"The Tissues","subject":"botany"},{"section":"section-560","chapter_name":"Anatomy of Flowering Plants","topic_name":"The Tissue System","subject":"botany"},{"section":"section-561","chapter_name":"Anatomy of Flowering Plants","topic_name":"Anatomy of Dicotyledonous and Monocotyledonous Plants","subject":"botany"},{"section":"section-562","chapter_name":"Anatomy of Flowering Plants","topic_name":"Secondary Growth","subject":"botany"},{"section":"section-568","chapter_name":"Cell - The Unit of Life","topic_name":"What is a Cell?","subject":"botany"},{"section":"section-569","chapter_name":"Cell - The Unit of Life","topic_name":"Cell Theory","subject":"botany"},{"section":"section-570","chapter_name":"Cell - The Unit of Life","topic_name":"An Overview of Cell","subject":"botany"},{"section":"section-571","chapter_name":"Cell - The Unit of Life","topic_name":"Prokaryotic Cells","subject":"botany"},{"section":"section-572","chapter_name":"Cell - The Unit of Life","topic_name":"Eukaryotic Cells","subject":"botany"},{"section":"section-585","chapter_name":"Cell Cycle and Cell Division","topic_name":"Cell Cycle","subject":"botany"},{"section":"section-586","chapter_name":"Cell Cycle and Cell Division","topic_name":"M Phase","subject":"botany"},{"section":"section-587","chapter_name":"Cell Cycle and Cell Division","topic_name":"Significance of Mitosis","subject":"botany"},{"section":"section-588","chapter_name":"Cell Cycle and Cell Division","topic_name":"Meiosis","subject":"botany"},{"section":"section-589","chapter_name":"Cell Cycle and Cell Division","topic_name":"Significance of Meiosis","subject":"botany"},{"section":"section-590","chapter_name":"Transport in Plants (OLD NCERT)","topic_name":"Means of Transport","subject":"botany"},{"section":"section-591","chapter_name":"Transport in Plants (OLD NCERT)","topic_name":"Plant-Water Relations","subject":"botany"},{"section":"section-592","chapter_name":"Transport in Plants (OLD NCERT)","topic_name":"Long Distance Transport of Water","subject":"botany"},{"section":"section-593","chapter_name":"Transport in Plants (OLD NCERT)","topic_name":"Transpiration","subject":"botany"},{"section":"section-594","chapter_name":"Transport in Plants (OLD NCERT)","topic_name":"Uptake and Transport of Mineral Nutrients","subject":"botany"},{"section":"section-595","chapter_name":"Transport in Plants (OLD NCERT)","topic_name":"Phloem Transport: Flow from Source to Sink","subject":"botany"},{"section":"section-596","chapter_name":"Mineral Nutrition (OLD NCERT)","topic_name":"Methods to Study the Mineral Requirements of Plants","subject":"botany"},{"section":"section-597","chapter_name":"Mineral Nutrition (OLD NCERT)","topic_name":"Essential Mineral Elements","subject":"botany"},{"section":"section-598","chapter_name":"Mineral Nutrition (OLD NCERT)","topic_name":"Mechanism of Absorption of Elements","subject":"botany"},{"section":"section-599","chapter_name":"Mineral Nutrition (OLD NCERT)","topic_name":"Translocation of Solutes","subject":"botany"},{"section":"section-600","chapter_name":"Mineral Nutrition (OLD NCERT)","topic_name":"Soil as Reservoir of Essential Elements","subject":"botany"},{"section":"section-601","chapter_name":"Mineral Nutrition (OLD NCERT)","topic_name":"Metabolism of Nitrogen","subject":"botany"},{"section":"section-602","chapter_name":"Photosynthesis in Higher Plants","topic_name":"What do we Know?","subject":"botany"},{"section":"section-603","chapter_name":"Photosynthesis in Higher Plants","topic_name":"Early Experiments","subject":"botany"},{"section":"section-604","chapter_name":"Photosynthesis in Higher Plants","topic_name":"Where does Photosynthesis take Place?","subject":"botany"},{"section":"section-605","chapter_name":"Photosynthesis in Higher Plants","topic_name":"How many Types of Pigments are Involved in Photosynthesis?","subject":"botany"},{"section":"section-606","chapter_name":"Photosynthesis in Higher Plants","topic_name":"What is Light Reaction?","subject":"botany"},{"section":"section-607","chapter_name":"Photosynthesis in Higher Plants","topic_name":"The Electron Transport","subject":"botany"},{"section":"section-608","chapter_name":"Photosynthesis in Higher Plants","topic_name":"Where are the ATP and NADPH Used?","subject":"botany"},{"section":"section-609","chapter_name":"Photosynthesis in Higher Plants","topic_name":"The C4 Pathway","subject":"botany"},{"section":"section-610","chapter_name":"Photosynthesis in Higher Plants","topic_name":"Photorespiration","subject":"botany"},{"section":"section-611","chapter_name":"Photosynthesis in Higher Plants","topic_name":"Factors affecting Photosynthesis","subject":"botany"},{"section":"section-612","chapter_name":"Respiration in Plants","topic_name":"Do Plants Breathe?","subject":"botany"},{"section":"section-613","chapter_name":"Respiration in Plants","topic_name":"Glycolysis","subject":"botany"},{"section":"section-614","chapter_name":"Respiration in Plants","topic_name":"Fermentation","subject":"botany"},{"section":"section-615","chapter_name":"Respiration in Plants","topic_name":"Aerobic Respiration","subject":"botany"},{"section":"section-616","chapter_name":"Respiration in Plants","topic_name":"The Respiratory Balance Sheet","subject":"botany"},{"section":"section-617","chapter_name":"Respiration in Plants","topic_name":"Amphibolic Pathway","subject":"botany"},{"section":"section-618","chapter_name":"Respiration in Plants","topic_name":"Respiratory Quotient","subject":"botany"},{"section":"section-619","chapter_name":"Plant Growth and Development","topic_name":"Growth","subject":"botany"},{"section":"section-620","chapter_name":"Plant Growth and Development","topic_name":"Differentiation, Dedifferentiation and Redifferentiation","subject":"botany"},{"section":"section-621","chapter_name":"Plant Growth and Development","topic_name":"Development","subject":"botany"},{"section":"section-622","chapter_name":"Plant Growth and Development","topic_name":"Plant Growth Regulators","subject":"botany"},{"section":"section-623","chapter_name":"Plant Growth and Development","topic_name":"Photoperiodism","subject":"botany"},{"section":"section-624","chapter_name":"Plant Growth and Development","topic_name":"Vernalisation","subject":"botany"},{"section":"section-625","chapter_name":"Plant Growth and Development","topic_name":"Seed Dormancy","subject":"botany"},{"section":"section-667","chapter_name":"Sexual Reproduction in Flowering Plants","topic_name":"Flower – A Fascinating Organ of Angiosperms","subject":"botany"},{"section":"section-668","chapter_name":"Sexual Reproduction in Flowering Plants","topic_name":"Pre-fertilisation : Structures and Events","subject":"botany"},{"section":"section-669","chapter_name":"Sexual Reproduction in Flowering Plants","topic_name":"Double Fertilisation","subject":"botany"},{"section":"section-670","chapter_name":"Sexual Reproduction in Flowering Plants","topic_name":"Post-fertilisation: Structures and Events","subject":"botany"},{"section":"section-671","chapter_name":"Sexual Reproduction in Flowering Plants","topic_name":"Apomixis and Polyembryony","subject":"botany"},{"section":"section-751","chapter_name":"Principles of Inheritance & Variation","topic_name":"Mendel's Laws of Inheritance","subject":"botany"},{"section":"section-684","chapter_name":"Principles of Inheritance & Variation","topic_name":"Inheritance of One Gene","subject":"botany"},{"section":"section-685","chapter_name":"Principles of Inheritance & Variation","topic_name":"Inheritance of Two Genes","subject":"botany"},{"section":"section-686","chapter_name":"Principles of Inheritance & Variation","topic_name":"Sex Determination","subject":"botany"},{"section":"section-687","chapter_name":"Principles of Inheritance & Variation","topic_name":"Mutation","subject":"botany"},{"section":"section-688","chapter_name":"Principles of Inheritance & Variation","topic_name":"Genetic Disorders","subject":"botany"},{"section":"section-689","chapter_name":"Molecular Basis of Inheritance","topic_name":"The DNA","subject":"botany"},{"section":"section-690","chapter_name":"Molecular Basis of Inheritance","topic_name":"The Search for Genetic Material","subject":"botany"},{"section":"section-691","chapter_name":"Molecular Basis of Inheritance","topic_name":"RNA World","subject":"botany"},{"section":"section-692","chapter_name":"Molecular Basis of Inheritance","topic_name":"Replication","subject":"botany"},{"section":"section-693","chapter_name":"Molecular Basis of Inheritance","topic_name":"Transcription","subject":"botany"},{"section":"section-694","chapter_name":"Molecular Basis of Inheritance","topic_name":"Genetic Code","subject":"botany"},{"section":"section-695","chapter_name":"Molecular Basis of Inheritance","topic_name":"Translation","subject":"botany"},{"section":"section-696","chapter_name":"Molecular Basis of Inheritance","topic_name":"Regulation of Gene Expression","subject":"botany"},{"section":"section-697","chapter_name":"Molecular Basis of Inheritance","topic_name":"Human Genome Project","subject":"botany"},{"section":"section-698","chapter_name":"Molecular Basis of Inheritance","topic_name":"DNA Fingerprinting","subject":"botany"},{"section":"section-713","chapter_name":"Strategies for Enhancement in Food Production","topic_name":"Animal Husbandry","subject":"botany"},{"section":"section-714","chapter_name":"Strategies for Enhancement in Food Production","topic_name":"Plant Breeding","subject":"botany"},{"section":"section-715","chapter_name":"Strategies for Enhancement in Food Production","topic_name":"Single Cell Proteins","subject":"botany"},{"section":"section-716","chapter_name":"Strategies for Enhancement in Food Production","topic_name":"Tissue Culture","subject":"botany"},{"section":"section-730","chapter_name":"Organisms and Populations","topic_name":"Organism and Its Environment","subject":"botany"},{"section":"section-731","chapter_name":"Organisms and Populations","topic_name":"Populations","subject":"botany"},{"section":"section-732","chapter_name":"Ecosystem","topic_name":"Ecosystem–Structure and Function","subject":"botany"},{"section":"section-733","chapter_name":"Ecosystem","topic_name":"Productivity","subject":"botany"},{"section":"section-734","chapter_name":"Ecosystem","topic_name":"Decomposition","subject":"botany"},{"section":"section-735","chapter_name":"Ecosystem","topic_name":"Energy Flow","subject":"botany"},{"section":"section-736","chapter_name":"Ecosystem","topic_name":"Ecological Pyramids","subject":"botany"},{"section":"section-737","chapter_name":"Ecosystem","topic_name":"Ecological Succession","subject":"botany"},{"section":"section-738","chapter_name":"Ecosystem","topic_name":"Nutrient Cycling","subject":"botany"},{"section":"section-739","chapter_name":"Ecosystem","topic_name":"Ecosystem Services","subject":"botany"},{"section":"section-740","chapter_name":"Biodiversity and Conservation","topic_name":"Biodiversity","subject":"botany"},{"section":"section-741","chapter_name":"Biodiversity and Conservation","topic_name":"Biodiversity Conservation","subject":"botany"},{"section":"section-742","chapter_name":"Environmental Issues (OLD NCERT)","topic_name":"Air Pollution and its Control","subject":"botany"},{"section":"section-743","chapter_name":"Environmental Issues (OLD NCERT)","topic_name":"Water Pollution and its Control","subject":"botany"},{"section":"section-744","chapter_name":"Environmental Issues (OLD NCERT)","topic_name":"Solid Wastes","subject":"botany"},{"section":"section-745","chapter_name":"Environmental Issues (OLD NCERT)","topic_name":"Agro-chemicals and their Effects","subject":"botany"},{"section":"section-746","chapter_name":"Environmental Issues (OLD NCERT)","topic_name":"Radioactive Wastes","subject":"botany"},{"section":"section-747","chapter_name":"Environmental Issues (OLD NCERT)","topic_name":"Greenhouse Effect and Global Warming","subject":"botany"},{"section":"section-748","chapter_name":"Environmental Issues (OLD NCERT)","topic_name":"Ozone Depletion in the Stratosphere","subject":"botany"},{"section":"section-749","chapter_name":"Environmental Issues (OLD NCERT)","topic_name":"Degradation by Improper Resource Utilisation and Maintenance","subject":"botany"},{"section":"section-750","chapter_name":"Environmental Issues (OLD NCERT)","topic_name":"Deforestation","subject":"botany"},{"section":"section-665","chapter_name":"Reproduction in Organisms (OLD NCERT)","topic_name":"Asexual Reproduction","subject":"botany"},{"section":"section-666","chapter_name":"Reproduction in Organisms (OLD NCERT)","topic_name":"Sexual Reproduction","subject":"botany"},{"section":"section-717","chapter_name":"Microbes in Human Welfare","topic_name":"Microbes in Household Products","subject":"botany"},{"section":"section-718","chapter_name":"Microbes in Human Welfare","topic_name":"Microbes in Industrial Products","subject":"botany"},{"section":"section-719","chapter_name":"Microbes in Human Welfare","topic_name":"Microbes in Sewage Treatment","subject":"botany"},{"section":"section-720","chapter_name":"Microbes in Human Welfare","topic_name":"Microbes in Production of Biogas","subject":"botany"},{"section":"section-721","chapter_name":"Microbes in Human Welfare","topic_name":"Microbes as Biocontrol Agents","subject":"botany"},{"section":"section-722","chapter_name":"Microbes in Human Welfare","topic_name":"Microbes as Biofertilisers","subject":"botany"},{"section":"section-282","chapter_name":"Some Basic Concepts Of Chemistry","topic_name":"IMPORTANCE OF CHEMISTRY","subject":"chemistry"},{"section":"section-283","chapter_name":"Some Basic Concepts Of Chemistry","topic_name":"Nature of Matter","subject":"chemistry"},{"section":"section-284","chapter_name":"Some Basic Concepts Of Chemistry","topic_name":"Properties of Matter and their Measurement","subject":"chemistry"},{"section":"section-285","chapter_name":"Some Basic Concepts Of Chemistry","topic_name":"Uncertainty in Measurement","subject":"chemistry"},{"section":"section-286","chapter_name":"Some Basic Concepts Of Chemistry","topic_name":"Laws of Chemical Combinations","subject":"chemistry"},{"section":"section-287","chapter_name":"Some Basic Concepts Of Chemistry","topic_name":"Dalton’s Atomic Theory","subject":"chemistry"},{"section":"section-288","chapter_name":"Some Basic Concepts Of Chemistry","topic_name":"Atomic and Molecular Masses","subject":"chemistry"},{"section":"section-289","chapter_name":"Some Basic Concepts Of Chemistry","topic_name":"Mole concept and Molar Masses","subject":"chemistry"},{"section":"section-290","chapter_name":"Some Basic Concepts Of Chemistry","topic_name":"Percentage Composition","subject":"chemistry"},{"section":"section-291","chapter_name":"Some Basic Concepts Of Chemistry","topic_name":"Stoichiometry and Stoichiometric Calculations","subject":"chemistry"},{"section":"section-292","chapter_name":"Structure of Atom","topic_name":"Discovery of Sub-atomic Particles","subject":"chemistry"},{"section":"section-293","chapter_name":"Structure of Atom","topic_name":"Atomic Models","subject":"chemistry"},{"section":"section-294","chapter_name":"Structure of Atom","topic_name":"Developments Leading to the Bohr’s Model of Atom","subject":"chemistry"},{"section":"section-295","chapter_name":"Structure of Atom","topic_name":"Bohr’s Model for Hydrogen Atom","subject":"chemistry"},{"section":"section-296","chapter_name":"Structure of Atom","topic_name":"Towards Quantum Mechanical Model of the Atom","subject":"chemistry"},{"section":"section-297","chapter_name":"Structure of Atom","topic_name":"Quantum Mechanical Model of Atom","subject":"chemistry"},{"section":"section-298","chapter_name":"Classification of Elements and Periodicity in Properties","topic_name":"WHY DO WE NEED TO CLASSIFY ELEMENTS ?","subject":"chemistry"},{"section":"section-299","chapter_name":"Classification of Elements and Periodicity in Properties","topic_name":"GENESIS OF PERIODIC CLASSIFICATION","subject":"chemistry"},{"section":"section-300","chapter_name":"Classification of Elements and Periodicity in Properties","topic_name":"MODERN PERIODIC LAW AND THE PRESENT FORM OF THE PERIODIC TABLE","subject":"chemistry"},{"section":"section-301","chapter_name":"Classification of Elements and Periodicity in Properties","topic_name":"NOMENCLATURE OF ELEMENTS WITH ATOMIC NUMBERS > 100","subject":"chemistry"},{"section":"section-302","chapter_name":"Classification of Elements and Periodicity in Properties","topic_name":"ELECTRONIC CONFIGURATIONS OF ELEMENTS AND THE PERIODIC TABLE","subject":"chemistry"},{"section":"section-303","chapter_name":"Classification of Elements and Periodicity in Properties","topic_name":"ELECTRONIC CONFIGURATIONS AND TYPES OF ELEMENTS: s-, p-, d-, f- BLOCKS","subject":"chemistry"},{"section":"section-304","chapter_name":"Classification of Elements and Periodicity in Properties","topic_name":"PERIODIC TRENDS IN PROPERTIES OF ELEMENTS","subject":"chemistry"},{"section":"section-305","chapter_name":"Chemical Bonding and Molecular Structure","topic_name":"KÖssel-Lewis Approach to Chemical Bonding","subject":"chemistry"},{"section":"section-306","chapter_name":"Chemical Bonding and Molecular Structure","topic_name":"Ionic or Electrovalent Bond","subject":"chemistry"},{"section":"section-307","chapter_name":"Chemical Bonding and Molecular Structure","topic_name":"Bond Parameters","subject":"chemistry"},{"section":"section-308","chapter_name":"Chemical Bonding and Molecular Structure","topic_name":"The Valence Shell Electron Pair Repulsion (VSEPR) Theory","subject":"chemistry"},{"section":"section-309","chapter_name":"Chemical Bonding and Molecular Structure","topic_name":"Valence Bond Theory","subject":"chemistry"},{"section":"section-310","chapter_name":"Chemical Bonding and Molecular Structure","topic_name":"Hybridisation","subject":"chemistry"},{"section":"section-311","chapter_name":"Chemical Bonding and Molecular Structure","topic_name":"Molecular Orbital Theory","subject":"chemistry"},{"section":"section-312","chapter_name":"Chemical Bonding and Molecular Structure","topic_name":"BONDING IN SOME HOMONUCLEAR DIATOMIC MOLECULES","subject":"chemistry"},{"section":"section-313","chapter_name":"Chemical Bonding and Molecular Structure","topic_name":"Hydrogen Bonding","subject":"chemistry"},{"section":"section-314","chapter_name":"States of Matter (OLD NCERT)","topic_name":"Intermolecular Forces","subject":"chemistry"},{"section":"section-315","chapter_name":"States of Matter (OLD NCERT)","topic_name":"Thermal Energy","subject":"chemistry"},{"section":"section-316","chapter_name":"States of Matter (OLD NCERT)","topic_name":"Intermolecular Forces vs Thermal Interactions","subject":"chemistry"},{"section":"section-317","chapter_name":"States of Matter (OLD NCERT)","topic_name":"The Gaseous State","subject":"chemistry"},{"section":"section-318","chapter_name":"States of Matter (OLD NCERT)","topic_name":"The Gas Laws","subject":"chemistry"},{"section":"section-319","chapter_name":"States of Matter (OLD NCERT)","topic_name":"Ideal Gas Equation","subject":"chemistry"},{"section":"section-320","chapter_name":"States of Matter (OLD NCERT)","topic_name":"Kinetic Energy and Molecular Speeds","subject":"chemistry"},{"section":"section-321","chapter_name":"States of Matter (OLD NCERT)","topic_name":"Kinetic Molecular Theory of Gases","subject":"chemistry"},{"section":"section-322","chapter_name":"States of Matter (OLD NCERT)","topic_name":"Behaviour of real gases: Deviation from ideal gas behaviour","subject":"chemistry"},{"section":"section-323","chapter_name":"States of Matter (OLD NCERT)","topic_name":"Liquifaction of Gases","subject":"chemistry"},{"section":"section-324","chapter_name":"States of Matter (OLD NCERT)","topic_name":"Liquid State","subject":"chemistry"},{"section":"section-325","chapter_name":"Thermodynamics","topic_name":"Thermodynamic terms","subject":"chemistry"},{"section":"section-326","chapter_name":"Thermodynamics","topic_name":"Applications","subject":"chemistry"},{"section":"section-327","chapter_name":"Thermodynamics","topic_name":"Measurement of ∆U and ∆H: Calorimetry","subject":"chemistry"},{"section":"section-328","chapter_name":"Thermodynamics","topic_name":"Enthalpy change, ∆rH of a reaction – Reaction Enthalpy","subject":"chemistry"},{"section":"section-329","chapter_name":"Thermodynamics","topic_name":"Enthalpies for different types of reactions","subject":"chemistry"},{"section":"section-330","chapter_name":"Thermodynamics","topic_name":"spontaneity","subject":"chemistry"},{"section":"section-331","chapter_name":"Thermodynamics","topic_name":"Gibbs energy change and equilibrium","subject":"chemistry"},{"section":"section-332","chapter_name":"Equilibrium","topic_name":"EQUILIBRIUM IN PHYSICAL PROCESSES","subject":"chemistry"},{"section":"section-333","chapter_name":"Equilibrium","topic_name":"EQUILIBRIUM IN CHEMICAL PROCESSES – DYNAMIC EQUILIBRIUM","subject":"chemistry"},{"section":"section-334","chapter_name":"Equilibrium","topic_name":"LAW OF CHEMICAL EQUILIBRIUM AND EQUILIBRIUM CONSTANT","subject":"chemistry"},{"section":"section-335","chapter_name":"Equilibrium","topic_name":"HOMOGENEOUS EQUILIBRIA","subject":"chemistry"},{"section":"section-336","chapter_name":"Equilibrium","topic_name":"HETEROGENEOUS EQUILIBRIA","subject":"chemistry"},{"section":"section-337","chapter_name":"Equilibrium","topic_name":"APPLICATIONS OF EQUILIBRIUM CONSTANTS","subject":"chemistry"},{"section":"section-338","chapter_name":"Equilibrium","topic_name":"Relationship between Equilibrium Constant K, Reaction Quotient Q and Gibbs Energy G","subject":"chemistry"},{"section":"section-339","chapter_name":"Equilibrium","topic_name":"FACTORS AFFECTING EQUILIBRIA","subject":"chemistry"},{"section":"section-340","chapter_name":"Equilibrium","topic_name":"IONIC EQUILIBRIUM IN SOLUTION","subject":"chemistry"},{"section":"section-341","chapter_name":"Equilibrium","topic_name":"ACIDS, BASES AND SALTS","subject":"chemistry"},{"section":"section-342","chapter_name":"Equilibrium","topic_name":"IONIZATION OF ACIDS AND BASES","subject":"chemistry"},{"section":"section-343","chapter_name":"Equilibrium","topic_name":"BUFFER SOLUTIONS","subject":"chemistry"},{"section":"section-344","chapter_name":"Equilibrium","topic_name":"SOLUBILITY EQUILIBRIA OF SPARINGLY SOLUBLE SALTS","subject":"chemistry"},{"section":"section-345","chapter_name":"Redox Reactions","topic_name":"CLASSICAL IDEA OF REDOX REACTIONS – OXIDATION AND REDUCTION REACTIONS","subject":"chemistry"},{"section":"section-346","chapter_name":"Redox Reactions","topic_name":"REDOX REACTIONS IN TERMS OF ELECTRON TRANSFER REACTIONS","subject":"chemistry"},{"section":"section-347","chapter_name":"Redox Reactions","topic_name":"OXIDATION NUMBER","subject":"chemistry"},{"section":"section-348","chapter_name":"Redox Reactions","topic_name":"Redox Reactions and Electrode Processes","subject":"chemistry"},{"section":"section-349","chapter_name":"Hydrogen (OLD NCERT)","topic_name":"POSITION OF HYDROGEN IN THE PERIODIC TABLE","subject":"chemistry"},{"section":"section-350","chapter_name":"Hydrogen (OLD NCERT)","topic_name":"DIHYDROGEN, H2","subject":"chemistry"},{"section":"section-351","chapter_name":"Hydrogen (OLD NCERT)","topic_name":"PREPARATION OF DIHYDROGEN, H2","subject":"chemistry"},{"section":"section-352","chapter_name":"Hydrogen (OLD NCERT)","topic_name":"Properties of Dihydrogen","subject":"chemistry"},{"section":"section-353","chapter_name":"Hydrogen (OLD NCERT)","topic_name":"Hydrides","subject":"chemistry"},{"section":"section-354","chapter_name":"Hydrogen (OLD NCERT)","topic_name":"Water","subject":"chemistry"},{"section":"section-355","chapter_name":"Hydrogen (OLD NCERT)","topic_name":"Hydrogen Peroxide (H2O2)","subject":"chemistry"},{"section":"section-356","chapter_name":"Hydrogen (OLD NCERT)","topic_name":"Heavy Water, D2O","subject":"chemistry"},{"section":"section-357","chapter_name":"Hydrogen (OLD NCERT)","topic_name":"DIHydrogen as a fuel","subject":"chemistry"},{"section":"section-358","chapter_name":"The s-Block Elements (OLD NCERT)","topic_name":"GROUP 1 ELEMENTS: ALKALI METALS","subject":"chemistry"},{"section":"section-359","chapter_name":"The s-Block Elements (OLD NCERT)","topic_name":"General Characteristics of the Compounds of the Alkali Metals","subject":"chemistry"},{"section":"section-360","chapter_name":"The s-Block Elements (OLD NCERT)","topic_name":"ANOMALOUS PROPERTIES OF LITHIUM","subject":"chemistry"},{"section":"section-361","chapter_name":"The s-Block Elements (OLD NCERT)","topic_name":"Some Important Compounds of Sodium","subject":"chemistry"},{"section":"section-362","chapter_name":"The s-Block Elements (OLD NCERT)","topic_name":"Biological Importance of Sodium and Potassium","subject":"chemistry"},{"section":"section-42","chapter_name":"Work, Energy and Power","topic_name":"Work","subject":"physics"},{"section":"section-363","chapter_name":"The s-Block Elements (OLD NCERT)","topic_name":"GROUP 2 ELEMENTS : ALKALINE EARTH METALS","subject":"chemistry"},{"section":"section-364","chapter_name":"The s-Block Elements (OLD NCERT)","topic_name":"General Characteristics of Compounds of the Alkaline Earth Metals","subject":"chemistry"},{"section":"section-365","chapter_name":"The s-Block Elements (OLD NCERT)","topic_name":"ANOMALOUS BEHAVIOUR OF BERYLLIUM","subject":"chemistry"},{"section":"section-366","chapter_name":"The s-Block Elements (OLD NCERT)","topic_name":"Some Important Compounds of Calcium","subject":"chemistry"},{"section":"section-367","chapter_name":"The s-Block Elements (OLD NCERT)","topic_name":"Biological Importance of Magnesium and Calcium","subject":"chemistry"},{"section":"section-368","chapter_name":"The p-Block Elements (XI)","topic_name":"GROUP 13 ELEMENTS: THE BORON FAMILY","subject":"chemistry"},{"section":"section-369","chapter_name":"The p-Block Elements (XI)","topic_name":"Important trends and Anomalous Properties of Boron","subject":"chemistry"},{"section":"section-370","chapter_name":"The p-Block Elements (XI)","topic_name":"Some important compounds of boron","subject":"chemistry"},{"section":"section-371","chapter_name":"The p-Block Elements (XI)","topic_name":"Uses of Boron and Aluminium and their Compounds","subject":"chemistry"},{"section":"section-372","chapter_name":"The p-Block Elements (XI)","topic_name":"GROUP 14 ELEMENTS: THE CARBON FAMILY","subject":"chemistry"},{"section":"section-373","chapter_name":"The p-Block Elements (XI)","topic_name":"Important Trends and Anomalous behaviour of carbon","subject":"chemistry"},{"section":"section-374","chapter_name":"The p-Block Elements (XI)","topic_name":"Allotropes of carbon","subject":"chemistry"},{"section":"section-375","chapter_name":"The p-Block Elements (XI)","topic_name":"Some important compounds of carbon and Silicon","subject":"chemistry"},{"section":"section-376","chapter_name":"Organic Chemistry - Some Basic Principles And Techniques","topic_name":"General Introduction","subject":"chemistry"},{"section":"section-377","chapter_name":"Organic Chemistry - Some Basic Principles And Techniques","topic_name":"TETRAVALENCE OF CARBON: SHAPES OF ORGANIC COMPOUNDS","subject":"chemistry"},{"section":"section-378","chapter_name":"Organic Chemistry - Some Basic Principles And Techniques","topic_name":"STRUCTURAL RepresenTATIONS OF organic COMPOUNDs","subject":"chemistry"},{"section":"section-379","chapter_name":"Organic Chemistry - Some Basic Principles And Techniques","topic_name":"Classification of Organic Compounds","subject":"chemistry"},{"section":"section-380","chapter_name":"Organic Chemistry - Some Basic Principles And Techniques","topic_name":"NOMENCLATURE OF ORGANIC COMPOUNDS","subject":"chemistry"},{"section":"section-381","chapter_name":"Organic Chemistry - Some Basic Principles And Techniques","topic_name":"ISOMERISM","subject":"chemistry"},{"section":"section-382","chapter_name":"Organic Chemistry - Some Basic Principles And Techniques","topic_name":"FUNDAMENTAL CONCEPTS IN ORGANIC REACTION MECHANISM","subject":"chemistry"},{"section":"section-383","chapter_name":"Organic Chemistry - Some Basic Principles And Techniques","topic_name":"Methods of Purification of Organic Compounds","subject":"chemistry"},{"section":"section-384","chapter_name":"Organic Chemistry - Some Basic Principles And Techniques","topic_name":"Qualitative Analysis of Organic Compounds","subject":"chemistry"},{"section":"section-385","chapter_name":"Organic Chemistry - Some Basic Principles And Techniques","topic_name":"Quantitative Analysis","subject":"chemistry"},{"section":"section-386","chapter_name":"Hydrocarbons","topic_name":"CLASSIFICATION","subject":"chemistry"},{"section":"section-387","chapter_name":"Hydrocarbons","topic_name":"ALKANES","subject":"chemistry"},{"section":"section-388","chapter_name":"Hydrocarbons","topic_name":"Alkenes","subject":"chemistry"},{"section":"section-389","chapter_name":"Hydrocarbons","topic_name":"Alkynes","subject":"chemistry"},{"section":"section-390","chapter_name":"Hydrocarbons","topic_name":"Aromatic Hydrocarbon","subject":"chemistry"},{"section":"section-391","chapter_name":"Hydrocarbons","topic_name":"Carcinogenicity and Toxicity","subject":"chemistry"},{"section":"section-392","chapter_name":"Environmental Chemistry (OLD NCERT)","topic_name":"ENVIRONMENTAL POLLUTION","subject":"chemistry"},{"section":"section-393","chapter_name":"Environmental Chemistry (OLD NCERT)","topic_name":"ATMOSPHERIC POLLUTION","subject":"chemistry"},{"section":"section-394","chapter_name":"Environmental Chemistry (OLD NCERT)","topic_name":"WATER POLLUTION","subject":"chemistry"},{"section":"section-395","chapter_name":"Environmental Chemistry (OLD NCERT)","topic_name":"SOIL POLLUTION","subject":"chemistry"},{"section":"section-396","chapter_name":"Environmental Chemistry (OLD NCERT)","topic_name":"Industrial Waste","subject":"chemistry"},{"section":"section-397","chapter_name":"Environmental Chemistry (OLD NCERT)","topic_name":"STRATEGIES TO CONTROL ENVIRONMENTAL POLLUTION","subject":"chemistry"},{"section":"section-398","chapter_name":"Environmental Chemistry (OLD NCERT)","topic_name":"GREEN CHEMISTRY","subject":"chemistry"},{"section":"section-399","chapter_name":"The Solid State (OLD NCERT)","topic_name":"General Characteristics of Solid State","subject":"chemistry"},{"section":"section-400","chapter_name":"The Solid State (OLD NCERT)","topic_name":"Amorphous and Crystalline Solids","subject":"chemistry"},{"section":"section-401","chapter_name":"The Solid State (OLD NCERT)","topic_name":"Classification of Crystalline Solids","subject":"chemistry"},{"section":"section-402","chapter_name":"The Solid State (OLD NCERT)","topic_name":"Crystal Lattices and Unit Cells","subject":"chemistry"},{"section":"section-403","chapter_name":"The Solid State (OLD NCERT)","topic_name":"Number of Atoms in a Unit Cell","subject":"chemistry"},{"section":"section-404","chapter_name":"The Solid State (OLD NCERT)","topic_name":"Close Packed Structures","subject":"chemistry"},{"section":"section-405","chapter_name":"The Solid State (OLD NCERT)","topic_name":"Packing Efficiency","subject":"chemistry"},{"section":"section-406","chapter_name":"The Solid State (OLD NCERT)","topic_name":"Calculations Involving Unit Cell Dimensions","subject":"chemistry"},{"section":"section-407","chapter_name":"The Solid State (OLD NCERT)","topic_name":"Imperfections in Solids","subject":"chemistry"},{"section":"section-408","chapter_name":"The Solid State (OLD NCERT)","topic_name":"Electrical Properties","subject":"chemistry"},{"section":"section-409","chapter_name":"The Solid State (OLD NCERT)","topic_name":"Magnetic Properties","subject":"chemistry"},{"section":"section-410","chapter_name":"Solutions","topic_name":"Types of Solutions","subject":"chemistry"},{"section":"section-411","chapter_name":"Solutions","topic_name":"Expressing Concentration of Solutions","subject":"chemistry"},{"section":"section-412","chapter_name":"Solutions","topic_name":"Solubility","subject":"chemistry"},{"section":"section-413","chapter_name":"Solutions","topic_name":"Vapour Pressure of Liquid Solutions","subject":"chemistry"},{"section":"section-414","chapter_name":"Solutions","topic_name":"Ideal and Non-ideal Solutions","subject":"chemistry"},{"section":"section-415","chapter_name":"Solutions","topic_name":"Colligative Properties and Determination of Molar Mass","subject":"chemistry"},{"section":"section-416","chapter_name":"Solutions","topic_name":"Abnormal Molar Masses","subject":"chemistry"},{"section":"section-417","chapter_name":"Electrochemistry","topic_name":"Electrochemical Cells","subject":"chemistry"},{"section":"section-418","chapter_name":"Electrochemistry","topic_name":"Galvanic Cells","subject":"chemistry"},{"section":"section-419","chapter_name":"Electrochemistry","topic_name":"Nernst Equation","subject":"chemistry"},{"section":"section-420","chapter_name":"Electrochemistry","topic_name":"Conductance of Electrolytic Solutions","subject":"chemistry"},{"section":"section-421","chapter_name":"Electrochemistry","topic_name":"Electrolytic Cells and Electrolysis","subject":"chemistry"},{"section":"section-422","chapter_name":"Electrochemistry","topic_name":"Batteries","subject":"chemistry"},{"section":"section-423","chapter_name":"Electrochemistry","topic_name":"Fuel Cells","subject":"chemistry"},{"section":"section-424","chapter_name":"Electrochemistry","topic_name":"Corrosion","subject":"chemistry"},{"section":"section-425","chapter_name":"Chemical Kinetics","topic_name":"Rate of a Chemical Reaction","subject":"chemistry"},{"section":"section-426","chapter_name":"Chemical Kinetics","topic_name":"Factors Influencing Rate of a Reaction","subject":"chemistry"},{"section":"section-427","chapter_name":"Chemical Kinetics","topic_name":"Integrated Rate Equations","subject":"chemistry"},{"section":"section-428","chapter_name":"Chemical Kinetics","topic_name":"Pseudo First Order Reaction","subject":"chemistry"},{"section":"section-429","chapter_name":"Chemical Kinetics","topic_name":"Temperature Dependence of the Rate of a Reaction","subject":"chemistry"},{"section":"section-430","chapter_name":"Chemical Kinetics","topic_name":"Collision Theory of Chemical Reactions","subject":"chemistry"},{"section":"section-431","chapter_name":"Surface Chemistry (OLD NCERT)","topic_name":"Adsorption","subject":"chemistry"},{"section":"section-432","chapter_name":"Surface Chemistry (OLD NCERT)","topic_name":"Catalysis","subject":"chemistry"},{"section":"section-433","chapter_name":"Surface Chemistry (OLD NCERT)","topic_name":"Colloids","subject":"chemistry"},{"section":"section-434","chapter_name":"Surface Chemistry (OLD NCERT)","topic_name":"Classification of Colloids","subject":"chemistry"},{"section":"section-435","chapter_name":"Surface Chemistry (OLD NCERT)","topic_name":"Emulsions","subject":"chemistry"},{"section":"section-436","chapter_name":"Surface Chemistry (OLD NCERT)","topic_name":"Colloids Around Us","subject":"chemistry"},{"section":"section-437","chapter_name":"General Principles and Processes of Isolation of Elements (OLD NCERT)","topic_name":"Occurrence of Metals","subject":"chemistry"},{"section":"section-438","chapter_name":"General Principles and Processes of Isolation of Elements (OLD NCERT)","topic_name":"Concentration of Ores","subject":"chemistry"},{"section":"section-439","chapter_name":"General Principles and Processes of Isolation of Elements (OLD NCERT)","topic_name":"Extraction of Crude Metal from Concentrated Ore","subject":"chemistry"},{"section":"section-440","chapter_name":"General Principles and Processes of Isolation of Elements (OLD NCERT)","topic_name":"Thermodynamic Principles of Metallurgy","subject":"chemistry"},{"section":"section-441","chapter_name":"General Principles and Processes of Isolation of Elements (OLD NCERT)","topic_name":"Electrochemical Principles of Metallurgy","subject":"chemistry"},{"section":"section-442","chapter_name":"General Principles and Processes of Isolation of Elements (OLD NCERT)","topic_name":"Oxidation Reduction","subject":"chemistry"},{"section":"section-443","chapter_name":"General Principles and Processes of Isolation of Elements (OLD NCERT)","topic_name":"Refining","subject":"chemistry"},{"section":"section-444","chapter_name":"General Principles and Processes of Isolation of Elements (OLD NCERT)","topic_name":"Uses of Aluminium, Copper, Zinc and Iron","subject":"chemistry"},{"section":"section-445","chapter_name":"The p-Block Elements (XII)","topic_name":"Group 15 Elements","subject":"chemistry"},{"section":"section-446","chapter_name":"The p-Block Elements (XII)","topic_name":"Dinitrogen","subject":"chemistry"},{"section":"section-447","chapter_name":"The p-Block Elements (XII)","topic_name":"Ammonia","subject":"chemistry"},{"section":"section-448","chapter_name":"The p-Block Elements (XII)","topic_name":"Oxides of Nitrogen","subject":"chemistry"},{"section":"section-449","chapter_name":"The p-Block Elements (XII)","topic_name":"Nitric Acid","subject":"chemistry"},{"section":"section-450","chapter_name":"The p-Block Elements (XII)","topic_name":"Phosphorus — Allotropic Forms","subject":"chemistry"},{"section":"section-451","chapter_name":"The p-Block Elements (XII)","topic_name":"Phosphine","subject":"chemistry"},{"section":"section-452","chapter_name":"The p-Block Elements (XII)","topic_name":"Phosphorus Halides","subject":"chemistry"},{"section":"section-453","chapter_name":"The p-Block Elements (XII)","topic_name":"Oxoacids of Phosphorus","subject":"chemistry"},{"section":"section-454","chapter_name":"The p-Block Elements (XII)","topic_name":"Group 16 Elements","subject":"chemistry"},{"section":"section-455","chapter_name":"The p-Block Elements (XII)","topic_name":"Dioxygen","subject":"chemistry"},{"section":"section-456","chapter_name":"The p-Block Elements (XII)","topic_name":"Simple Oxides","subject":"chemistry"},{"section":"section-457","chapter_name":"The p-Block Elements (XII)","topic_name":"Ozone","subject":"chemistry"},{"section":"section-458","chapter_name":"The p-Block Elements (XII)","topic_name":"Sulphur — Allotropic Forms","subject":"chemistry"},{"section":"section-459","chapter_name":"The p-Block Elements (XII)","topic_name":"Sulphur Dioxide","subject":"chemistry"},{"section":"section-460","chapter_name":"The p-Block Elements (XII)","topic_name":"Oxoacids of Sulphur","subject":"chemistry"},{"section":"section-461","chapter_name":"The p-Block Elements (XII)","topic_name":"Sulphuric Acid","subject":"chemistry"},{"section":"section-462","chapter_name":"The p-Block Elements (XII)","topic_name":"Group 17 Elements","subject":"chemistry"},{"section":"section-463","chapter_name":"The p-Block Elements (XII)","topic_name":"Chlorine","subject":"chemistry"},{"section":"section-464","chapter_name":"The p-Block Elements (XII)","topic_name":"Hydrogen Chloride","subject":"chemistry"},{"section":"section-465","chapter_name":"The p-Block Elements (XII)","topic_name":"Oxoacids of Halogens","subject":"chemistry"},{"section":"section-466","chapter_name":"The p-Block Elements (XII)","topic_name":"Interhalogen Compounds","subject":"chemistry"},{"section":"section-467","chapter_name":"The p-Block Elements (XII)","topic_name":"Group 18 Elements","subject":"chemistry"},{"section":"section-468","chapter_name":"The d and f Block Elements","topic_name":"Position in the Periodic Table","subject":"chemistry"},{"section":"section-469","chapter_name":"The d and f Block Elements","topic_name":"Electronic Configurations of the d-Block Elements","subject":"chemistry"},{"section":"section-470","chapter_name":"The d and f Block Elements","topic_name":"General Properties of the Transition Elements (d-Block)","subject":"chemistry"},{"section":"section-471","chapter_name":"The d and f Block Elements","topic_name":"Some Important Compounds of Transition Elements","subject":"chemistry"},{"section":"section-472","chapter_name":"The d and f Block Elements","topic_name":"The Lanthanoids","subject":"chemistry"},{"section":"section-473","chapter_name":"The d and f Block Elements","topic_name":"The Actinoids","subject":"chemistry"},{"section":"section-474","chapter_name":"The d and f Block Elements","topic_name":"Some Applications of d- and f-Block Elements","subject":"chemistry"},{"section":"section-475","chapter_name":"Coordination Compounds","topic_name":"Werner’s Theory of Coordination Compounds","subject":"chemistry"},{"section":"section-476","chapter_name":"Coordination Compounds","topic_name":"Definitions of Some Important Terms Pertaining to Coordination Compounds","subject":"chemistry"},{"section":"section-477","chapter_name":"Coordination Compounds","topic_name":"Nomenclature of Coordination Compounds","subject":"chemistry"},{"section":"section-478","chapter_name":"Coordination Compounds","topic_name":"Isomerism in Coordination Compounds","subject":"chemistry"},{"section":"section-479","chapter_name":"Coordination Compounds","topic_name":"Bonding in Coordination Compounds","subject":"chemistry"},{"section":"section-480","chapter_name":"Coordination Compounds","topic_name":"Bonding in Metal Carbonyls","subject":"chemistry"},{"section":"section-481","chapter_name":"Coordination Compounds","topic_name":"Stability of Coordination Compounds","subject":"chemistry"},{"section":"section-482","chapter_name":"Coordination Compounds","topic_name":"Importance and Applications of Coordination Compounds","subject":"chemistry"},{"section":"section-483","chapter_name":"Haloalkanes and Haloarenes","topic_name":"Classification","subject":"chemistry"},{"section":"section-484","chapter_name":"Haloalkanes and Haloarenes","topic_name":"Nomenclature","subject":"chemistry"},{"section":"section-485","chapter_name":"Haloalkanes and Haloarenes","topic_name":"Nature of C-X Bond","subject":"chemistry"},{"section":"section-486","chapter_name":"Haloalkanes and Haloarenes","topic_name":"Methods of Preparation of Haloalkanes","subject":"chemistry"},{"section":"section-487","chapter_name":"Haloalkanes and Haloarenes","topic_name":"Preparation of Haloarenes","subject":"chemistry"},{"section":"section-488","chapter_name":"Haloalkanes and Haloarenes","topic_name":"Physical Properties","subject":"chemistry"},{"section":"section-489","chapter_name":"Haloalkanes and Haloarenes","topic_name":"Chemical Reactions","subject":"chemistry"},{"section":"section-490","chapter_name":"Haloalkanes and Haloarenes","topic_name":"Polyhalogen Compounds","subject":"chemistry"},{"section":"section-491","chapter_name":"Alcohols,Phenols and Ethers","topic_name":"Classification","subject":"chemistry"},{"section":"section-492","chapter_name":"Alcohols,Phenols and Ethers","topic_name":"Nomenclature","subject":"chemistry"},{"section":"section-493","chapter_name":"Alcohols,Phenols and Ethers","topic_name":"Structures of Functional Groups","subject":"chemistry"},{"section":"section-494","chapter_name":"Alcohols,Phenols and Ethers","topic_name":"Alcohols and Phenols","subject":"chemistry"},{"section":"section-495","chapter_name":"Alcohols,Phenols and Ethers","topic_name":"Some Commercially Important Alcohols","subject":"chemistry"},{"section":"section-496","chapter_name":"Alcohols,Phenols and Ethers","topic_name":"Ethers","subject":"chemistry"},{"section":"section-497","chapter_name":"Aldehydes, Ketones and Carboxylic Acids","topic_name":"Nomenclature and Structure of Carbonyl Group","subject":"chemistry"},{"section":"section-498","chapter_name":"Aldehydes, Ketones and Carboxylic Acids","topic_name":"Preparation of Aldehydes and Ketones","subject":"chemistry"},{"section":"section-499","chapter_name":"Aldehydes, Ketones and Carboxylic Acids","topic_name":"Physical Properties","subject":"chemistry"},{"section":"section-500","chapter_name":"Aldehydes, Ketones and Carboxylic Acids","topic_name":"Chemical Reactions","subject":"chemistry"},{"section":"section-501","chapter_name":"Aldehydes, Ketones and Carboxylic Acids","topic_name":"Uses of Aldehydes and Ketones","subject":"chemistry"},{"section":"section-502","chapter_name":"Aldehydes, Ketones and Carboxylic Acids","topic_name":"Nomenclature and Structure of Carboxyl Group","subject":"chemistry"},{"section":"section-503","chapter_name":"Aldehydes, Ketones and Carboxylic Acids","topic_name":"Methods of Preparation of Carboxylic Acids","subject":"chemistry"},{"section":"section-504","chapter_name":"Aldehydes, Ketones and Carboxylic Acids","topic_name":"Chemical Reactions","subject":"chemistry"},{"section":"section-505","chapter_name":"Aldehydes, Ketones and Carboxylic Acids","topic_name":"Uses of Carboxylic Acids","subject":"chemistry"},{"section":"section-506","chapter_name":"Amines","topic_name":"Structure of Amines","subject":"chemistry"},{"section":"section-507","chapter_name":"Amines","topic_name":"Classification","subject":"chemistry"},{"section":"section-508","chapter_name":"Amines","topic_name":"Nomenclature","subject":"chemistry"},{"section":"section-509","chapter_name":"Amines","topic_name":"Preparation of Amines","subject":"chemistry"},{"section":"section-510","chapter_name":"Amines","topic_name":"Physical Properties","subject":"chemistry"},{"section":"section-511","chapter_name":"Amines","topic_name":"Chemical Reactions","subject":"chemistry"},{"section":"section-512","chapter_name":"Amines","topic_name":"Method of Preparation of Diazoniun Salts","subject":"chemistry"},{"section":"section-513","chapter_name":"Amines","topic_name":"Physical Properties","subject":"chemistry"},{"section":"section-514","chapter_name":"Amines","topic_name":"Chemical Reactions","subject":"chemistry"},{"section":"section-515","chapter_name":"Amines","topic_name":"Importance of Diazonium Salts in Synthesis of Aromatic Compounds","subject":"chemistry"},{"section":"section-516","chapter_name":"Biomolecules","topic_name":"Carbohydrates","subject":"chemistry"},{"section":"section-517","chapter_name":"Biomolecules","topic_name":"Proteins","subject":"chemistry"},{"section":"section-518","chapter_name":"Biomolecules","topic_name":"Enzymes","subject":"chemistry"},{"section":"section-519","chapter_name":"Biomolecules","topic_name":"Vitamins","subject":"chemistry"},{"section":"section-520","chapter_name":"Biomolecules","topic_name":"Nucleic Acids","subject":"chemistry"},{"section":"section-521","chapter_name":"Biomolecules","topic_name":"Hormones","subject":"chemistry"},{"section":"section-522","chapter_name":"Polymers (OLD NCERT)","topic_name":"Classification of Polymers","subject":"chemistry"},{"section":"section-523","chapter_name":"Polymers (OLD NCERT)","topic_name":"Types of Polymerisation Reactions","subject":"chemistry"},{"section":"section-524","chapter_name":"Polymers (OLD NCERT)","topic_name":"Molecular Mass of Polymers","subject":"chemistry"},{"section":"section-525","chapter_name":"Polymers (OLD NCERT)","topic_name":"Biodegradable Polymers","subject":"chemistry"},{"section":"section-526","chapter_name":"Polymers (OLD NCERT)","topic_name":"Polymers of Commercial Importance","subject":"chemistry"},{"section":"section-527","chapter_name":"Chemistry in Everyday Life (OLD NCERT)","topic_name":"Drugs and their Classification","subject":"chemistry"},{"section":"section-528","chapter_name":"Chemistry in Everyday Life (OLD NCERT)","topic_name":"Drug-Target Interaction","subject":"chemistry"},{"section":"section-529","chapter_name":"Chemistry in Everyday Life (OLD NCERT)","topic_name":"Therapeutic Action of Different Classes of Drugs","subject":"chemistry"},{"section":"section-530","chapter_name":"Chemistry in Everyday Life (OLD NCERT)","topic_name":"Chemicals in Food","subject":"chemistry"},{"section":"section-531","chapter_name":"Chemistry in Everyday Life (OLD NCERT)","topic_name":"Cleansing Agents","subject":"chemistry"},{"section":"section-1","chapter_name":"Units and Measurement","topic_name":"Introduction","subject":"physics"},{"section":"section-2","chapter_name":"Units and Measurement","topic_name":"The International System of Units","subject":"physics"},{"section":"section-3","chapter_name":"Units and Measurement","topic_name":"Measurement of Length","subject":"physics"},{"section":"section-4","chapter_name":"Units and Measurement","topic_name":"Measurement of Mass","subject":"physics"},{"section":"section-5","chapter_name":"Units and Measurement","topic_name":"Measurement of time","subject":"physics"},{"section":"section-6","chapter_name":"Units and Measurement","topic_name":"Accuracy, precision of instruments and errors in measurement","subject":"physics"},{"section":"section-7","chapter_name":"Units and Measurement","topic_name":"Significant figures","subject":"physics"},{"section":"section-8","chapter_name":"Units and Measurement","topic_name":"Dimensions of physical quantities","subject":"physics"},{"section":"section-9","chapter_name":"Units and Measurement","topic_name":"Dimensional formulae and dimensional equations","subject":"physics"},{"section":"section-10","chapter_name":"Units and Measurement","topic_name":"Dimensional analysis and its applications","subject":"physics"},{"section":"section-11","chapter_name":"Motion in A Straight Line","topic_name":"Introduction","subject":"physics"},{"section":"section-12","chapter_name":"Motion in A Straight Line","topic_name":"Position, path length and displacement","subject":"physics"},{"section":"section-13","chapter_name":"Motion in A Straight Line","topic_name":"Average velocity and average speed","subject":"physics"},{"section":"section-14","chapter_name":"Motion in A Straight Line","topic_name":"Instantaneous velocity and speed","subject":"physics"},{"section":"section-15","chapter_name":"Motion in A Straight Line","topic_name":"Acceleration","subject":"physics"},{"section":"section-16","chapter_name":"Motion in A Straight Line","topic_name":"Kinematic equations for uniformly accelerated motion","subject":"physics"},{"section":"section-17","chapter_name":"Motion in A Straight Line","topic_name":"Relative velocity","subject":"physics"},{"section":"section-18","chapter_name":"Motion in A Plane","topic_name":"Introduction","subject":"physics"},{"section":"section-19","chapter_name":"Motion in A Plane","topic_name":"Scalars and vectors","subject":"physics"},{"section":"section-20","chapter_name":"Motion in A Plane","topic_name":"Multiplication of vectors by real numbers","subject":"physics"},{"section":"section-21","chapter_name":"Motion in A Plane","topic_name":"Addition and subtraction of vectors — graphical method","subject":"physics"},{"section":"section-22","chapter_name":"Motion in A Plane","topic_name":"Resolution of vectors","subject":"physics"},{"section":"section-23","chapter_name":"Motion in A Plane","topic_name":"Vector addition – analytical method","subject":"physics"},{"section":"section-24","chapter_name":"Motion in A Plane","topic_name":"Motion in a plane","subject":"physics"},{"section":"section-25","chapter_name":"Motion in A Plane","topic_name":"Motion in a plane with constant acceleration","subject":"physics"},{"section":"section-26","chapter_name":"Motion in A Plane","topic_name":"Relative velocity in two dimensions","subject":"physics"},{"section":"section-27","chapter_name":"Motion in A Plane","topic_name":"Projectile motion","subject":"physics"},{"section":"section-28","chapter_name":"Motion in A Plane","topic_name":"Uniform circular motion","subject":"physics"},{"section":"section-29","chapter_name":"Laws of Motion","topic_name":"Introduction","subject":"physics"},{"section":"section-30","chapter_name":"Laws of Motion","topic_name":"Aristotle’s fallacy","subject":"physics"},{"section":"section-31","chapter_name":"Laws of Motion","topic_name":"The law of inertia","subject":"physics"},{"section":"section-32","chapter_name":"Laws of Motion","topic_name":"Newton’s First Law of motion","subject":"physics"},{"section":"section-33","chapter_name":"Laws of Motion","topic_name":"Newton’s Second Law of motion","subject":"physics"},{"section":"section-34","chapter_name":"Laws of Motion","topic_name":"Newton’s Third Law of motion","subject":"physics"},{"section":"section-35","chapter_name":"Laws of Motion","topic_name":"Conservation of momentum","subject":"physics"},{"section":"section-36","chapter_name":"Laws of Motion","topic_name":"Equilibrium of a particle","subject":"physics"},{"section":"section-37","chapter_name":"Laws of Motion","topic_name":"Common forces in mechanics","subject":"physics"},{"section":"section-38","chapter_name":"Laws of Motion","topic_name":"Circular motion","subject":"physics"},{"section":"section-39","chapter_name":"Laws of Motion","topic_name":"Solving problems in mechanics","subject":"physics"},{"section":"section-40","chapter_name":"Work, Energy and Power","topic_name":"Introduction","subject":"physics"},{"section":"section-41","chapter_name":"Work, Energy and Power","topic_name":"Notions of work and kinetic energy: the work-energy theorem","subject":"physics"},{"section":"section-43","chapter_name":"Work, Energy and Power","topic_name":"Kinetic energy","subject":"physics"},{"section":"section-44","chapter_name":"Work, Energy and Power","topic_name":"Work done by a variable force","subject":"physics"},{"section":"section-45","chapter_name":"Work, Energy and Power","topic_name":"The work-energy theorem for a variable force","subject":"physics"},{"section":"section-46","chapter_name":"Work, Energy and Power","topic_name":"The concept of potential energy","subject":"physics"},{"section":"section-47","chapter_name":"Work, Energy and Power","topic_name":"the conservation of mechanical energy","subject":"physics"},{"section":"section-48","chapter_name":"Work, Energy and Power","topic_name":"The potential energy of a spring","subject":"physics"},{"section":"section-49","chapter_name":"Work, Energy and Power","topic_name":"Various forms of energy : the law of conservation of energy","subject":"physics"},{"section":"section-50","chapter_name":"Work, Energy and Power","topic_name":"Power","subject":"physics"},{"section":"section-51","chapter_name":"Work, Energy and Power","topic_name":"Collisions","subject":"physics"},{"section":"section-52","chapter_name":"Systems of Particles and Rotational Motion","topic_name":"Introduction","subject":"physics"},{"section":"section-53","chapter_name":"Systems of Particles and Rotational Motion","topic_name":"Centre of Mass","subject":"physics"},{"section":"section-54","chapter_name":"Systems of Particles and Rotational Motion","topic_name":"Motion of Centre of Mass","subject":"physics"},{"section":"section-55","chapter_name":"Systems of Particles and Rotational Motion","topic_name":"Linear Momentum of a system of Particles","subject":"physics"},{"section":"section-56","chapter_name":"Systems of Particles and Rotational Motion","topic_name":"Vector Product of Two Vectors","subject":"physics"},{"section":"section-57","chapter_name":"Systems of Particles and Rotational Motion","topic_name":"Angular velocity and its Relation with Linear velocity","subject":"physics"},{"section":"section-58","chapter_name":"Systems of Particles and Rotational Motion","topic_name":"Torque and Angular Momentum","subject":"physics"},{"section":"section-59","chapter_name":"Systems of Particles and Rotational Motion","topic_name":"Equilibrium of a rigid Body","subject":"physics"},{"section":"section-60","chapter_name":"Systems of Particles and Rotational Motion","topic_name":"Moment of Inertia","subject":"physics"},{"section":"section-61","chapter_name":"Systems of Particles and Rotational Motion","topic_name":"Theorems of perpendicular and parallel axes","subject":"physics"},{"section":"section-62","chapter_name":"Systems of Particles and Rotational Motion","topic_name":"Kinematics of Rotational Motion about a fixed axis","subject":"physics"},{"section":"section-63","chapter_name":"Systems of Particles and Rotational Motion","topic_name":"Dynamics of Rotational motion about a fixed axis","subject":"physics"},{"section":"section-64","chapter_name":"Systems of Particles and Rotational Motion","topic_name":"Angular Momentum in case of Rotation about a Fixed Axis","subject":"physics"},{"section":"section-65","chapter_name":"Systems of Particles and Rotational Motion","topic_name":"Rolling Motion","subject":"physics"},{"section":"section-66","chapter_name":"Gravitation","topic_name":"Introduction","subject":"physics"},{"section":"section-67","chapter_name":"Gravitation","topic_name":"Kepler’s laws","subject":"physics"},{"section":"section-68","chapter_name":"Gravitation","topic_name":"Universal law of gravitation","subject":"physics"},{"section":"section-69","chapter_name":"Gravitation","topic_name":"The Gravitational Constant","subject":"physics"},{"section":"section-70","chapter_name":"Gravitation","topic_name":"Acceleration due to gravity of the earth","subject":"physics"},{"section":"section-71","chapter_name":"Gravitation","topic_name":"Acceleration due to gravity below and above the surface of earth","subject":"physics"},{"section":"section-72","chapter_name":"Gravitation","topic_name":"Gravitational potential energy","subject":"physics"},{"section":"section-73","chapter_name":"Gravitation","topic_name":"Escape Speed","subject":"physics"},{"section":"section-74","chapter_name":"Gravitation","topic_name":"Earth Satellites","subject":"physics"},{"section":"section-75","chapter_name":"Gravitation","topic_name":"Energy of an orbiting Satellite","subject":"physics"},{"section":"section-76","chapter_name":"Gravitation","topic_name":"Geostationary and Polar Satellites","subject":"physics"},{"section":"section-77","chapter_name":"Gravitation","topic_name":"Weightlessness","subject":"physics"},{"section":"section-78","chapter_name":"Mechanical Properties of Solids","topic_name":"Introduction","subject":"physics"},{"section":"section-79","chapter_name":"Mechanical Properties of Solids","topic_name":"Elastic behaviour of solids","subject":"physics"},{"section":"section-80","chapter_name":"Mechanical Properties of Solids","topic_name":"Stress and Strain","subject":"physics"},{"section":"section-81","chapter_name":"Mechanical Properties of Solids","topic_name":"Hooke’s law","subject":"physics"},{"section":"section-82","chapter_name":"Mechanical Properties of Solids","topic_name":"Stress-Strain curve","subject":"physics"},{"section":"section-83","chapter_name":"Mechanical Properties of Solids","topic_name":"Elastic moduli","subject":"physics"},{"section":"section-84","chapter_name":"Mechanical Properties of Solids","topic_name":"Applications of elastic behaviour of materials","subject":"physics"},{"section":"section-85","chapter_name":"Mechanical Properties of Fluids","topic_name":"Introduction","subject":"physics"},{"section":"section-86","chapter_name":"Mechanical Properties of Fluids","topic_name":"Pressure","subject":"physics"},{"section":"section-87","chapter_name":"Mechanical Properties of Fluids","topic_name":"STREAMLINE FLOW","subject":"physics"},{"section":"section-88","chapter_name":"Mechanical Properties of Fluids","topic_name":"BERNOULLI’S PRINCIPLE","subject":"physics"},{"section":"section-89","chapter_name":"Mechanical Properties of Fluids","topic_name":"VISCOSITY","subject":"physics"},{"section":"section-852","chapter_name":"Mechanical Properties of Fluids","topic_name":"Reynolds Number","subject":"physics"},{"section":"section-90","chapter_name":"Mechanical Properties of Fluids","topic_name":"SURFACE TENSION","subject":"physics"},{"section":"section-91","chapter_name":"Thermal Properties of Matter","topic_name":"Introduction","subject":"physics"},{"section":"section-92","chapter_name":"Thermal Properties of Matter","topic_name":"Temperature and Heat","subject":"physics"},{"section":"section-93","chapter_name":"Thermal Properties of Matter","topic_name":"Measurement of Temperature","subject":"physics"},{"section":"section-94","chapter_name":"Thermal Properties of Matter","topic_name":"Ideal-gas Equation and Absolute Temperature","subject":"physics"},{"section":"section-95","chapter_name":"Thermal Properties of Matter","topic_name":"Thermal Expansion","subject":"physics"},{"section":"section-96","chapter_name":"Thermal Properties of Matter","topic_name":"Specific Heat Capacity","subject":"physics"},{"section":"section-97","chapter_name":"Thermal Properties of Matter","topic_name":"Calorimetry","subject":"physics"},{"section":"section-98","chapter_name":"Thermal Properties of Matter","topic_name":"Change of State","subject":"physics"},{"section":"section-99","chapter_name":"Thermal Properties of Matter","topic_name":"Heat transfer","subject":"physics"},{"section":"section-100","chapter_name":"Thermal Properties of Matter","topic_name":"Newton’s Law of Cooling","subject":"physics"},{"section":"section-101","chapter_name":"Thermodynamics","topic_name":"Introduction","subject":"physics"},{"section":"section-102","chapter_name":"Thermodynamics","topic_name":"Thermal equilibrium","subject":"physics"},{"section":"section-103","chapter_name":"Thermodynamics","topic_name":"Zeroth Law of Thermodynamics","subject":"physics"},{"section":"section-104","chapter_name":"Thermodynamics","topic_name":"Heat, internal energy and work","subject":"physics"},{"section":"section-105","chapter_name":"Thermodynamics","topic_name":"First Law of Thermodynamics","subject":"physics"},{"section":"section-106","chapter_name":"Thermodynamics","topic_name":"Specific heat capacity","subject":"physics"},{"section":"section-107","chapter_name":"Thermodynamics","topic_name":"Thermodynamic state variables and Equation of State","subject":"physics"},{"section":"section-108","chapter_name":"Thermodynamics","topic_name":"Thermodynamic processes","subject":"physics"},{"section":"section-109","chapter_name":"Thermodynamics","topic_name":"Heat engines","subject":"physics"},{"section":"section-110","chapter_name":"Thermodynamics","topic_name":"Refrigerators and heat pumps","subject":"physics"},{"section":"section-111","chapter_name":"Thermodynamics","topic_name":"Second Law of Thermodynamics","subject":"physics"},{"section":"section-112","chapter_name":"Thermodynamics","topic_name":"Reversible and irreversible processes","subject":"physics"},{"section":"section-113","chapter_name":"Thermodynamics","topic_name":"Carnot engine","subject":"physics"},{"section":"section-114","chapter_name":"Kinetic Theory of Gases","topic_name":"Introduction","subject":"physics"},{"section":"section-115","chapter_name":"Kinetic Theory of Gases","topic_name":"Molecular Nature of Matter","subject":"physics"},{"section":"section-116","chapter_name":"Kinetic Theory of Gases","topic_name":"Behaviour of Gases","subject":"physics"},{"section":"section-117","chapter_name":"Kinetic Theory of Gases","topic_name":"KINETIC THEORY OF AN IDEAL GAS","subject":"physics"},{"section":"section-118","chapter_name":"Kinetic Theory of Gases","topic_name":"LAW OF EQUIPARTITION OF ENERGY","subject":"physics"},{"section":"section-119","chapter_name":"Kinetic Theory of Gases","topic_name":"Specific Heat Capacity","subject":"physics"},{"section":"section-120","chapter_name":"Kinetic Theory of Gases","topic_name":"MEAN FREE PATH","subject":"physics"},{"section":"section-121","chapter_name":"Oscillations","topic_name":"Introduction","subject":"physics"},{"section":"section-122","chapter_name":"Oscillations","topic_name":"Periodic and Oscillatory motions","subject":"physics"},{"section":"section-123","chapter_name":"Oscillations","topic_name":"Simple harmonic motion","subject":"physics"},{"section":"section-124","chapter_name":"Oscillations","topic_name":"Simple harmonic motion and uniform circular motion","subject":"physics"},{"section":"section-125","chapter_name":"Oscillations","topic_name":"Velocity and acceleration in simple harmonic motion","subject":"physics"},{"section":"section-126","chapter_name":"Oscillations","topic_name":"Force law for simple harmonic motion","subject":"physics"},{"section":"section-127","chapter_name":"Oscillations","topic_name":"Energy in simple harmonic motion","subject":"physics"},{"section":"section-128","chapter_name":"Oscillations","topic_name":"Some systems executing simple harmonic motion","subject":"physics"},{"section":"section-129","chapter_name":"Oscillations","topic_name":"Damped simple harmonic motion","subject":"physics"},{"section":"section-130","chapter_name":"Oscillations","topic_name":"Forced oscillations and resonance","subject":"physics"},{"section":"section-131","chapter_name":"Waves","topic_name":"Introduction","subject":"physics"},{"section":"section-132","chapter_name":"Waves","topic_name":"Transverse and longitudinal waves","subject":"physics"},{"section":"section-133","chapter_name":"Waves","topic_name":"Displacement relation in a progressive wave","subject":"physics"},{"section":"section-134","chapter_name":"Waves","topic_name":"The speed of a travelling wave","subject":"physics"},{"section":"section-135","chapter_name":"Waves","topic_name":"The principle of superposition of waves","subject":"physics"},{"section":"section-136","chapter_name":"Waves","topic_name":"Reflection of waves","subject":"physics"},{"section":"section-137","chapter_name":"Waves","topic_name":"Beats","subject":"physics"},{"section":"section-138","chapter_name":"Waves","topic_name":"Doppler effect","subject":"physics"},{"section":"section-139","chapter_name":"Electric Charges and Fields","topic_name":"INTRODUCTION","subject":"physics"},{"section":"section-140","chapter_name":"Electric Charges and Fields","topic_name":"ELECTRIC CHARGE","subject":"physics"},{"section":"section-141","chapter_name":"Electric Charges and Fields","topic_name":"CONDUCTORS AND INSULATORS","subject":"physics"},{"section":"section-142","chapter_name":"Electric Charges and Fields","topic_name":"CHARGING BY INDUCTION","subject":"physics"},{"section":"section-143","chapter_name":"Electric Charges and Fields","topic_name":"BASIC PROPERTIES OF ELECTRIC CHARGE","subject":"physics"},{"section":"section-144","chapter_name":"Electric Charges and Fields","topic_name":"COULOMB’S LAW","subject":"physics"},{"section":"section-145","chapter_name":"Electric Charges and Fields","topic_name":"FORCES BETWEEN MULTIPLE CHARGES","subject":"physics"},{"section":"section-146","chapter_name":"Electric Charges and Fields","topic_name":"ELECTRIC FIELD","subject":"physics"},{"section":"section-147","chapter_name":"Electric Charges and Fields","topic_name":"ELECTRIC FIELD LINES","subject":"physics"},{"section":"section-148","chapter_name":"Electric Charges and Fields","topic_name":"ELECTRIC FLUX","subject":"physics"},{"section":"section-149","chapter_name":"Electric Charges and Fields","topic_name":"ELECTRIC DIPOLE","subject":"physics"},{"section":"section-150","chapter_name":"Electric Charges and Fields","topic_name":"DIPOLE IN A UNIFORM EXTERNAL FIELD","subject":"physics"},{"section":"section-151","chapter_name":"Electric Charges and Fields","topic_name":"CONTINUOUS CHARGE DISTRIBUTION","subject":"physics"},{"section":"section-152","chapter_name":"Electric Charges and Fields","topic_name":"GAUSS’S LAW","subject":"physics"},{"section":"section-153","chapter_name":"Electric Charges and Fields","topic_name":"APPLICATIONS OF GAUSS’S LAW","subject":"physics"},{"section":"section-154","chapter_name":"Electrostatic Potential and Capacitance","topic_name":"Introduction","subject":"physics"},{"section":"section-155","chapter_name":"Electrostatic Potential and Capacitance","topic_name":"Electrostatic Potential","subject":"physics"},{"section":"section-156","chapter_name":"Electrostatic Potential and Capacitance","topic_name":"POTENTIAL DUE TO A POINT CHARGE","subject":"physics"},{"section":"section-157","chapter_name":"Electrostatic Potential and Capacitance","topic_name":"POTENTIAL DUE TO AN ELECTRIC DIPOLE","subject":"physics"},{"section":"section-158","chapter_name":"Electrostatic Potential and Capacitance","topic_name":"POTENTIAL DUE TO A SYSTEM OF CHARGES","subject":"physics"},{"section":"section-159","chapter_name":"Electrostatic Potential and Capacitance","topic_name":"EQUIPOTENTIAL SURFACES","subject":"physics"},{"section":"section-160","chapter_name":"Electrostatic Potential and Capacitance","topic_name":"Potential Energy of a System of Charges","subject":"physics"},{"section":"section-161","chapter_name":"Electrostatic Potential and Capacitance","topic_name":"Potential Energy in an External Field","subject":"physics"},{"section":"section-162","chapter_name":"Electrostatic Potential and Capacitance","topic_name":"ELECTROSTATICS OF CONDUCTORS","subject":"physics"},{"section":"section-163","chapter_name":"Electrostatic Potential and Capacitance","topic_name":"DIELECTRICS AND POLARISATION","subject":"physics"},{"section":"section-164","chapter_name":"Electrostatic Potential and Capacitance","topic_name":"CAPACITORS AND CAPACITANCE","subject":"physics"},{"section":"section-165","chapter_name":"Electrostatic Potential and Capacitance","topic_name":"THE PARALLEL PLATE CAPACITOR","subject":"physics"},{"section":"section-166","chapter_name":"Electrostatic Potential and Capacitance","topic_name":"Effect of Dielectric on Capacitance","subject":"physics"},{"section":"section-167","chapter_name":"Electrostatic Potential and Capacitance","topic_name":"COMBINATION OF CAPACITORS","subject":"physics"},{"section":"section-168","chapter_name":"Electrostatic Potential and Capacitance","topic_name":"ENERGY STORED IN A CAPACITOR","subject":"physics"},{"section":"section-169","chapter_name":"Current Electricity","topic_name":"Introduction","subject":"physics"},{"section":"section-170","chapter_name":"Current Electricity","topic_name":"Electric Current","subject":"physics"},{"section":"section-171","chapter_name":"Current Electricity","topic_name":"Electric Currents in Conductors","subject":"physics"},{"section":"section-172","chapter_name":"Current Electricity","topic_name":"Ohm’s Law","subject":"physics"},{"section":"section-173","chapter_name":"Current Electricity","topic_name":"Drift of Electrons and the Origin of Resistivity","subject":"physics"},{"section":"section-174","chapter_name":"Current Electricity","topic_name":"Limitations of Ohm’s Law","subject":"physics"},{"section":"section-175","chapter_name":"Current Electricity","topic_name":"Resistivity of Various Materials","subject":"physics"},{"section":"section-176","chapter_name":"Current Electricity","topic_name":"Temperature Dependence of Resistivity","subject":"physics"},{"section":"section-177","chapter_name":"Current Electricity","topic_name":"Electrical Energy, Power","subject":"physics"},{"section":"section-178","chapter_name":"Current Electricity","topic_name":"Combination of Resistors – Series and Parallel","subject":"physics"},{"section":"section-179","chapter_name":"Current Electricity","topic_name":"Cells, emf, Internal Resistance","subject":"physics"},{"section":"section-180","chapter_name":"Current Electricity","topic_name":"Cells in Series and in Parallel","subject":"physics"},{"section":"section-181","chapter_name":"Current Electricity","topic_name":"Kirchhoff’s Rules","subject":"physics"},{"section":"section-182","chapter_name":"Current Electricity","topic_name":"Wheatstone Bridge","subject":"physics"},{"section":"section-183","chapter_name":"Current Electricity","topic_name":"Meter Bridge","subject":"physics"},{"section":"section-184","chapter_name":"Current Electricity","topic_name":"Potentiometer","subject":"physics"},{"section":"section-185","chapter_name":"Moving Charges and Magnetism","topic_name":"Introduction","subject":"physics"},{"section":"section-186","chapter_name":"Moving Charges and Magnetism","topic_name":"Magnetic Force","subject":"physics"},{"section":"section-187","chapter_name":"Moving Charges and Magnetism","topic_name":"Motion in a Magnetic Field","subject":"physics"},{"section":"section-188","chapter_name":"Moving Charges and Magnetism","topic_name":"Motion in Combined Electric and Magnetic Fields","subject":"physics"},{"section":"section-189","chapter_name":"Moving Charges and Magnetism","topic_name":"Magnetic Field due to a Current Element, Biot-Savart Law","subject":"physics"},{"section":"section-190","chapter_name":"Moving Charges and Magnetism","topic_name":"Magnetic Field on the Axis of a Circular Current Loop","subject":"physics"},{"section":"section-191","chapter_name":"Moving Charges and Magnetism","topic_name":"Ampere’s Circuital Law","subject":"physics"},{"section":"section-192","chapter_name":"Moving Charges and Magnetism","topic_name":"The Solenoid and the Toroid","subject":"physics"},{"section":"section-193","chapter_name":"Moving Charges and Magnetism","topic_name":"Force between Two Parallel Currents,the Ampere","subject":"physics"},{"section":"section-194","chapter_name":"Moving Charges and Magnetism","topic_name":"Torque on Current Loop, Magnetic Dipole","subject":"physics"},{"section":"section-195","chapter_name":"Moving Charges and Magnetism","topic_name":"The Moving Coil Galvanometer","subject":"physics"},{"section":"section-196","chapter_name":"Magnetism and Matter","topic_name":"Introduction","subject":"physics"},{"section":"section-197","chapter_name":"Magnetism and Matter","topic_name":"The Bar Magnet","subject":"physics"},{"section":"section-198","chapter_name":"Magnetism and Matter","topic_name":"MAGNETISM AND GAUSS’S LAW","subject":"physics"},{"section":"section-199","chapter_name":"Magnetism and Matter","topic_name":"The Earth’s Magnetism","subject":"physics"},{"section":"section-200","chapter_name":"Magnetism and Matter","topic_name":"Magnetisation and Magnetic Intensity","subject":"physics"},{"section":"section-201","chapter_name":"Magnetism and Matter","topic_name":"Magnetic Properties of Materials","subject":"physics"},{"section":"section-202","chapter_name":"Magnetism and Matter","topic_name":"Permanent Magnets and Electromagnets","subject":"physics"},{"section":"section-203","chapter_name":"Electromagnetic Induction","topic_name":"Introduction","subject":"physics"},{"section":"section-204","chapter_name":"Electromagnetic Induction","topic_name":"The Experiments of Faraday and Henry","subject":"physics"},{"section":"section-205","chapter_name":"Electromagnetic Induction","topic_name":"Magnetic Flux","subject":"physics"},{"section":"section-206","chapter_name":"Electromagnetic Induction","topic_name":"Faraday’s Law of Induction","subject":"physics"},{"section":"section-207","chapter_name":"Electromagnetic Induction","topic_name":"Lenz’s Law and Conservation of Energy","subject":"physics"},{"section":"section-208","chapter_name":"Electromagnetic Induction","topic_name":"Motional Electromotive Force","subject":"physics"},{"section":"section-209","chapter_name":"Electromagnetic Induction","topic_name":"Energy Consideration: A Quantitative Study","subject":"physics"},{"section":"section-210","chapter_name":"Electromagnetic Induction","topic_name":"Eddy Currents","subject":"physics"},{"section":"section-211","chapter_name":"Electromagnetic Induction","topic_name":"Inductance","subject":"physics"},{"section":"section-212","chapter_name":"Electromagnetic Induction","topic_name":"AC Generator","subject":"physics"},{"section":"section-213","chapter_name":"Alternating Current","topic_name":"Introduction","subject":"physics"},{"section":"section-214","chapter_name":"Alternating Current","topic_name":"AC Voltage Applied to a Resistor","subject":"physics"},{"section":"section-215","chapter_name":"Alternating Current","topic_name":"Representation of AC Current and Voltage by Rotating Vectors — Phasors","subject":"physics"},{"section":"section-216","chapter_name":"Alternating Current","topic_name":"AC Voltage Applied to an Inductor","subject":"physics"},{"section":"section-217","chapter_name":"Alternating Current","topic_name":"AC Voltage Applied to a Capacitor","subject":"physics"},{"section":"section-218","chapter_name":"Alternating Current","topic_name":"AC Voltage Applied to a Series  LCR Circuit","subject":"physics"},{"section":"section-219","chapter_name":"Alternating Current","topic_name":"Power in AC Circuit: The Power Factor","subject":"physics"},{"section":"section-220","chapter_name":"Alternating Current","topic_name":"LC Oscillations","subject":"physics"},{"section":"section-221","chapter_name":"Alternating Current","topic_name":"Transformers","subject":"physics"},{"section":"section-222","chapter_name":"Electromagnetic Waves","topic_name":"Introduction","subject":"physics"},{"section":"section-223","chapter_name":"Electromagnetic Waves","topic_name":"Displacement Current","subject":"physics"},{"section":"section-224","chapter_name":"Electromagnetic Waves","topic_name":"ELECTROMAGNETIC WAVES","subject":"physics"},{"section":"section-225","chapter_name":"Electromagnetic Waves","topic_name":"Electromagnetic Spectrum","subject":"physics"},{"section":"section-226","chapter_name":"Ray Optics and Optical Instruments","topic_name":"Introduction","subject":"physics"},{"section":"section-227","chapter_name":"Ray Optics and Optical Instruments","topic_name":"Reflection of Light by Spherical Mirrors","subject":"physics"},{"section":"section-228","chapter_name":"Ray Optics and Optical Instruments","topic_name":"Refraction","subject":"physics"},{"section":"section-229","chapter_name":"Ray Optics and Optical Instruments","topic_name":"Total Internal Reflection","subject":"physics"},{"section":"section-230","chapter_name":"Ray Optics and Optical Instruments","topic_name":"Refraction at Spherical Surfaces And By Lenses","subject":"physics"},{"section":"section-231","chapter_name":"Ray Optics and Optical Instruments","topic_name":"Refraction through a Prism","subject":"physics"},{"section":"section-819","chapter_name":"Ray Optics and Optical Instruments","topic_name":"Dispersion by a Prism","subject":"physics"},{"section":"section-232","chapter_name":"Ray Optics and Optical Instruments","topic_name":"Some Natural Phenomena due to Sunlight","subject":"physics"},{"section":"section-233","chapter_name":"Ray Optics and Optical Instruments","topic_name":"Optical Instruments","subject":"physics"},{"section":"section-234","chapter_name":"Wave Optics","topic_name":"Introduction","subject":"physics"},{"section":"section-235","chapter_name":"Wave Optics","topic_name":"Huygens Principle","subject":"physics"},{"section":"section-236","chapter_name":"Wave Optics","topic_name":"Refraction and Reflection of Plane Waves using Huygens Principle","subject":"physics"},{"section":"section-237","chapter_name":"Wave Optics","topic_name":"Coherent and Incoherent Addition of Waves","subject":"physics"},{"section":"section-238","chapter_name":"Wave Optics","topic_name":"Interference of Light Waves and Young’s Experiment","subject":"physics"},{"section":"section-239","chapter_name":"Wave Optics","topic_name":"Diffraction","subject":"physics"},{"section":"section-240","chapter_name":"Wave Optics","topic_name":"Polarisation","subject":"physics"},{"section":"section-241","chapter_name":"Dual Nature of Radiation and Matter","topic_name":"Introduction","subject":"physics"},{"section":"section-242","chapter_name":"Dual Nature of Radiation and Matter","topic_name":"Electron Emission","subject":"physics"},{"section":"section-243","chapter_name":"Dual Nature of Radiation and Matter","topic_name":"Photoelectric Effect","subject":"physics"},{"section":"section-244","chapter_name":"Dual Nature of Radiation and Matter","topic_name":"Experimental Study of Photoelectric Effect","subject":"physics"},{"section":"section-245","chapter_name":"Dual Nature of Radiation and Matter","topic_name":"Photoelectric Effect and Wave Theory oF Light","subject":"physics"},{"section":"section-246","chapter_name":"Dual Nature of Radiation and Matter","topic_name":"Einstein’s Photoelectric Equation: Energy Quantum of Radiation","subject":"physics"},{"section":"section-247","chapter_name":"Dual Nature of Radiation and Matter","topic_name":"Particle Nature of Light: The Photon","subject":"physics"},{"section":"section-248","chapter_name":"Dual Nature of Radiation and Matter","topic_name":"Wave Nature of Matter","subject":"physics"},{"section":"section-249","chapter_name":"Dual Nature of Radiation and Matter","topic_name":"Davisson and Germer Experiment","subject":"physics"},{"section":"section-250","chapter_name":"Atoms","topic_name":"Introduction","subject":"physics"},{"section":"section-251","chapter_name":"Atoms","topic_name":"Alpha-particle Scattering and Rutherford’s Nuclear Model of Atom","subject":"physics"},{"section":"section-252","chapter_name":"Atoms","topic_name":"Atomic Spectra","subject":"physics"},{"section":"section-253","chapter_name":"Atoms","topic_name":"Bohr Model of the Hydrogen Atom","subject":"physics"},{"section":"section-254","chapter_name":"Atoms","topic_name":"The Line Spectra of the Hydrogen Atom","subject":"physics"},{"section":"section-255","chapter_name":"Atoms","topic_name":"De Broglie’s Explanation of Bohr’s Second Postulate of Quantisation","subject":"physics"},{"section":"section-256","chapter_name":"Nuclei","topic_name":"Introduction","subject":"physics"},{"section":"section-257","chapter_name":"Nuclei","topic_name":"Atomic Masses and Composition of Nucleus","subject":"physics"},{"section":"section-258","chapter_name":"Nuclei","topic_name":"Size of the Nucleus","subject":"physics"},{"section":"section-259","chapter_name":"Nuclei","topic_name":"Mass-Energy and Nuclear Binding Energy","subject":"physics"},{"section":"section-260","chapter_name":"Nuclei","topic_name":"Nuclear Force","subject":"physics"},{"section":"section-261","chapter_name":"Nuclei","topic_name":"Radioactivity","subject":"physics"},{"section":"section-262","chapter_name":"Nuclei","topic_name":"Nuclear Energy","subject":"physics"},{"section":"section-263","chapter_name":"Semiconductor Electronics","topic_name":"Introduction","subject":"physics"},{"section":"section-264","chapter_name":"Semiconductor Electronics","topic_name":"Classification of Metals, Conductors and Semiconductors","subject":"physics"},{"section":"section-265","chapter_name":"Semiconductor Electronics","topic_name":"Intrinsic Semiconductor","subject":"physics"},{"section":"section-266","chapter_name":"Semiconductor Electronics","topic_name":"Extrinsic Semiconductor","subject":"physics"},{"section":"section-267","chapter_name":"Semiconductor Electronics","topic_name":"p-n Junction","subject":"physics"},{"section":"section-268","chapter_name":"Semiconductor Electronics","topic_name":"Semiconductor Diode","subject":"physics"},{"section":"section-269","chapter_name":"Semiconductor Electronics","topic_name":"Application of Junction Diode as a Rectifier","subject":"physics"},{"section":"section-270","chapter_name":"Semiconductor Electronics","topic_name":"Special Purpose p-n Junction Diodes","subject":"physics"},{"section":"section-752","chapter_name":"Semiconductor Electronics","topic_name":"Junction Transistor","subject":"physics"},{"section":"section-271","chapter_name":"Semiconductor Electronics","topic_name":"Digital Electronics and Logic Gates","subject":"physics"},{"section":"section-573","chapter_name":"Biomolecules","topic_name":"How to Analyse Chemical Composition?","subject":"zoology"},{"section":"section-574","chapter_name":"Biomolecules","topic_name":"Primary and Secondary Metabolites","subject":"zoology"},{"section":"section-575","chapter_name":"Biomolecules","topic_name":"Biomacromolecules","subject":"zoology"},{"section":"section-576","chapter_name":"Biomolecules","topic_name":"Proteins","subject":"zoology"},{"section":"section-577","chapter_name":"Biomolecules","topic_name":"Polysaccharides","subject":"zoology"},{"section":"section-578","chapter_name":"Biomolecules","topic_name":"Nucleic Acids","subject":"zoology"},{"section":"section-579","chapter_name":"Biomolecules","topic_name":"Structure of Proteins","subject":"zoology"},{"section":"section-580","chapter_name":"Biomolecules","topic_name":"Nature of Bond Linking Monomers in a Polymer","subject":"zoology"},{"section":"section-581","chapter_name":"Biomolecules","topic_name":"Dynamic State of Body Constituents – Concept of Metabolism","subject":"zoology"},{"section":"section-582","chapter_name":"Biomolecules","topic_name":"Metabolic Basis for Living","subject":"zoology"},{"section":"section-583","chapter_name":"Biomolecules","topic_name":"The Living State","subject":"zoology"},{"section":"section-584","chapter_name":"Biomolecules","topic_name":"Enzymes","subject":"zoology"},{"section":"section-723","chapter_name":"Biotechnology: Principles and Processes","topic_name":"Principles of Biotechnology","subject":"zoology"},{"section":"section-724","chapter_name":"Biotechnology: Principles and Processes","topic_name":"Tools of Recombinant DNA Technology","subject":"zoology"},{"section":"section-725","chapter_name":"Biotechnology: Principles and Processes","topic_name":"Processes of Recombinant DNA Technology","subject":"zoology"},{"section":"section-726","chapter_name":"Biotechnology and its Applications","topic_name":"Biotechnological Applications in Agriculture","subject":"zoology"},{"section":"section-727","chapter_name":"Biotechnology and its Applications","topic_name":"Biotechnological Applications in Medicine","subject":"zoology"},{"section":"section-728","chapter_name":"Biotechnology and its Applications","topic_name":"Transgenic Animals","subject":"zoology"},{"section":"section-729","chapter_name":"Biotechnology and its Applications","topic_name":"Ethical Issues","subject":"zoology"},{"section":"section-548","chapter_name":"Animal Kingdom","topic_name":"Basis of Classification","subject":"zoology"},{"section":"section-549","chapter_name":"Animal Kingdom","topic_name":"Classification of Animals","subject":"zoology"},{"section":"section-563","chapter_name":"Structural Organisation in Animals","topic_name":"Animal Tissues","subject":"zoology"},{"section":"section-564","chapter_name":"Structural Organisation in Animals","topic_name":"Organ and Organ System","subject":"zoology"},{"section":"section-565","chapter_name":"Structural Organisation in Animals","topic_name":"Earthworm","subject":"zoology"},{"section":"section-566","chapter_name":"Structural Organisation in Animals","topic_name":"Cockroach","subject":"zoology"},{"section":"section-567","chapter_name":"Structural Organisation in Animals","topic_name":"Frogs","subject":"zoology"},{"section":"section-626","chapter_name":"Digestion and Absorption (OLD NCERT)","topic_name":"Digestive System","subject":"zoology"},{"section":"section-627","chapter_name":"Digestion and Absorption (OLD NCERT)","topic_name":"Digestion of Food","subject":"zoology"},{"section":"section-628","chapter_name":"Digestion and Absorption (OLD NCERT)","topic_name":"Absorption of Digested Products","subject":"zoology"},{"section":"section-629","chapter_name":"Digestion and Absorption (OLD NCERT)","topic_name":"Disorders of Digestive System","subject":"zoology"},{"section":"section-630","chapter_name":"Breathing and Exchange of Gases","topic_name":"Respiratory Organs","subject":"zoology"},{"section":"section-631","chapter_name":"Breathing and Exchange of Gases","topic_name":"Mechanism of Breathing","subject":"zoology"},{"section":"section-632","chapter_name":"Breathing and Exchange of Gases","topic_name":"Exchange of Gases","subject":"zoology"},{"section":"section-633","chapter_name":"Breathing and Exchange of Gases","topic_name":"Transport of Gases","subject":"zoology"},{"section":"section-634","chapter_name":"Breathing and Exchange of Gases","topic_name":"Regulation of Respiration","subject":"zoology"},{"section":"section-635","chapter_name":"Breathing and Exchange of Gases","topic_name":"Disorders of Respiratory System","subject":"zoology"},{"section":"section-636","chapter_name":"Body Fluids and Circulation","topic_name":"Blood","subject":"zoology"},{"section":"section-637","chapter_name":"Body Fluids and Circulation","topic_name":"Lymph (Tissue Fluid)","subject":"zoology"},{"section":"section-638","chapter_name":"Body Fluids and Circulation","topic_name":"Circulatory Pathways","subject":"zoology"},{"section":"section-639","chapter_name":"Body Fluids and Circulation","topic_name":"Double Circulation","subject":"zoology"},{"section":"section-640","chapter_name":"Body Fluids and Circulation","topic_name":"Regulation of Cardiac Activity","subject":"zoology"},{"section":"section-641","chapter_name":"Body Fluids and Circulation","topic_name":"Disorders of Circulatory System","subject":"zoology"},{"section":"section-642","chapter_name":"Excretory Products and their Elimination","topic_name":"Human Excretory System","subject":"zoology"},{"section":"section-643","chapter_name":"Excretory Products and their Elimination","topic_name":"Urine Formation","subject":"zoology"},{"section":"section-644","chapter_name":"Excretory Products and their Elimination","topic_name":"Function of the Tubules","subject":"zoology"},{"section":"section-645","chapter_name":"Excretory Products and their Elimination","topic_name":"Mechanism of Concentration of the Filtrate","subject":"zoology"},{"section":"section-646","chapter_name":"Excretory Products and their Elimination","topic_name":"Regulation of Kidney Function","subject":"zoology"},{"section":"section-647","chapter_name":"Excretory Products and their Elimination","topic_name":"Micturition","subject":"zoology"},{"section":"section-648","chapter_name":"Excretory Products and their Elimination","topic_name":"Role of other Organs in Excretion","subject":"zoology"},{"section":"section-649","chapter_name":"Excretory Products and their Elimination","topic_name":"Disorders of the Excretory System","subject":"zoology"},{"section":"section-650","chapter_name":"Locomotion and Movement","topic_name":"Types of Movement","subject":"zoology"},{"section":"section-651","chapter_name":"Locomotion and Movement","topic_name":"Muscle","subject":"zoology"},{"section":"section-652","chapter_name":"Locomotion and Movement","topic_name":"Skeletal System","subject":"zoology"},{"section":"section-653","chapter_name":"Locomotion and Movement","topic_name":"Joints","subject":"zoology"},{"section":"section-654","chapter_name":"Locomotion and Movement","topic_name":"Disorders of Muscular and Skeletal System","subject":"zoology"},{"section":"section-655","chapter_name":"Neural Control and Coordination","topic_name":"Neural System","subject":"zoology"},{"section":"section-656","chapter_name":"Neural Control and Coordination","topic_name":"Human Neural System","subject":"zoology"},{"section":"section-657","chapter_name":"Neural Control and Coordination","topic_name":"Neuron as Structural and Functional Unit of Neural System","subject":"zoology"},{"section":"section-658","chapter_name":"Neural Control and Coordination","topic_name":"Central Neural System","subject":"zoology"},{"section":"section-659","chapter_name":"Neural Control and Coordination","topic_name":"Reflex Action and Reflex Arc","subject":"zoology"},{"section":"section-660","chapter_name":"Neural Control and Coordination","topic_name":"Sensory Reception and Processing","subject":"zoology"},{"section":"section-661","chapter_name":"Chemical Coordination and Integration","topic_name":"Endocrine Glands and Hormones","subject":"zoology"},{"section":"section-662","chapter_name":"Chemical Coordination and Integration","topic_name":"Human Endocrine System","subject":"zoology"},{"section":"section-663","chapter_name":"Chemical Coordination and Integration","topic_name":"Hormones of Heart, Kidney and Gastrointestinal Tract","subject":"zoology"},{"section":"section-664","chapter_name":"Chemical Coordination and Integration","topic_name":"Mechanism of Hormone Action","subject":"zoology"},{"section":"section-672","chapter_name":"Human Reproduction","topic_name":"The Male Reproductive System","subject":"zoology"},{"section":"section-673","chapter_name":"Human Reproduction","topic_name":"The Female Reproductive System","subject":"zoology"},{"section":"section-674","chapter_name":"Human Reproduction","topic_name":"Gametogenesis","subject":"zoology"},{"section":"section-675","chapter_name":"Human Reproduction","topic_name":"Menstrual Cycle","subject":"zoology"},{"section":"section-676","chapter_name":"Human Reproduction","topic_name":"Fertilisation and Implantation","subject":"zoology"},{"section":"section-677","chapter_name":"Human Reproduction","topic_name":"Pregnancy and Embryonic Development","subject":"zoology"},{"section":"section-678","chapter_name":"Human Reproduction","topic_name":"Parturition and Lactation","subject":"zoology"},{"section":"section-679","chapter_name":"Reproductive Health","topic_name":"Reproductive Health – Problems and Strategies","subject":"zoology"},{"section":"section-680","chapter_name":"Reproductive Health","topic_name":"Population Explosion and Birth Control","subject":"zoology"},{"section":"section-681","chapter_name":"Reproductive Health","topic_name":"Medical Termination of Pregnancy","subject":"zoology"},{"section":"section-682","chapter_name":"Reproductive Health","topic_name":"Sexually Transmitted Diseases","subject":"zoology"},{"section":"section-683","chapter_name":"Reproductive Health","topic_name":"Infertility","subject":"zoology"},{"section":"section-699","chapter_name":"Evolution","topic_name":"Origin of Life","subject":"zoology"},{"section":"section-700","chapter_name":"Evolution","topic_name":"Evolution of Life Forms - A Theory","subject":"zoology"},{"section":"section-701","chapter_name":"Evolution","topic_name":"What are the Evidences for Evolution?","subject":"zoology"},{"section":"section-702","chapter_name":"Evolution","topic_name":"What is Adaptive Radiation?","subject":"zoology"},{"section":"section-703","chapter_name":"Evolution","topic_name":"Biological Evolution","subject":"zoology"},{"section":"section-704","chapter_name":"Evolution","topic_name":"Mechanism of Evolution","subject":"zoology"},{"section":"section-705","chapter_name":"Evolution","topic_name":"Hardy - Weinberg Principle","subject":"zoology"},{"section":"section-706","chapter_name":"Evolution","topic_name":"A Brief Account of Evolution","subject":"zoology"},{"section":"section-707","chapter_name":"Evolution","topic_name":"Origin and Evolution of Man","subject":"zoology"},{"section":"section-708","chapter_name":"Human Health and Disease","topic_name":"Common Diseases in Humans","subject":"zoology"},{"section":"section-709","chapter_name":"Human Health and Disease","topic_name":"Immunity","subject":"zoology"},{"section":"section-710","chapter_name":"Human Health and Disease","topic_name":"AIDS","subject":"zoology"},{"section":"section-711","chapter_name":"Human Health and Disease","topic_name":"Cancer","subject":"zoology"},{"section":"section-712","chapter_name":"Human Health and Disease","topic_name":"Drugs and Alcohol Abuse","subject":"zoology"}
    // ]
    const fetchData = async () => {
      try {
        setLoader(true)
        const response = await fetch('/api/getSection');
        const result = await response.json();
        console.log('RESPONSE', result);
  
        // Use a callback function with setData to make sure you're using the updated state
        setData((prevData) => {
          const parsedData = JSON.parse(result.data);
  
          const chemistryArr = [];
          const physicsArr = [];
          const biologyArr = [];
  
          for (let i = 0; i < parsedData.length; i++) {
            if (parsedData[i].subject === 'chemistry') {
              chemistryArr.push(parsedData[i]);
            } else if (parsedData[i].subject === 'physics') {
              physicsArr.push(parsedData[i]);
            } else {
              biologyArr.push(parsedData[i]);
            }
          }
  
          setChemistry(chemistryArr);
          setPhysics(physicsArr);
          setBiology(biologyArr);
          setLoader(false)
          const uniqueChapterNames = new Set();
          const uniquePhysicsChapterName = new Set();
          const uniqueBiologyChapterName = new Set();
  
          for (const entry of chemistryArr) {
            uniqueChapterNames.add(entry.chapter_name);
          }
          for (const entry of physicsArr) {
            uniquePhysicsChapterName.add(entry.chapter_name);
          }
          for (const entry of biologyArr) {
            uniqueBiologyChapterName.add(entry.chapter_name);
          }
  
          const uniqueChapterNamesArray = Array.from(uniqueChapterNames);
          const uniquePhysicsNamesArray = Array.from(uniquePhysicsChapterName);
          const uniqueBiologyNamesArray = Array.from(uniqueBiologyChapterName);
  
          setChemistryChapter(uniqueChapterNamesArray);
          setPhysicsChapter(uniquePhysicsNamesArray);
          setBiologyChapter(uniqueBiologyNamesArray);
  
          console.log(physicsChapter);
          console.log(chemistryChapter);
          console.log(biologyChapter);
  
          // Return the updated state
          return parsedData;
        });
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchData();
    handleGetTutor()
  }, []); 
  const [status, setStatus] = useState("page1");
  const [num,setNum]= useState('')
  const [standard,setStandard] = useState()
  const [liveBotStatus,setLiveBotStatus]=useState('home')
  const [name,setName]=useState('')
  const [bot,setBot]= useState(false)

  const [showHome, setShowHome] = useState(false);

  const handleSkipClick = () => {
    setShowHome(true);
  };

async function handleSaveUser(){

  try {
    const response = await axios.post('/api/createLiveTutorUser', {
      name: name,
      standard: standard,
      phone: num,
    });
   
    console.log('Tutor created:', response.data);
  } catch (error) {
    console.error('Error creating tutor:', error);
  }

}

{/*}
const [{ run, steps }, setState] = useState({
  run: true,
  steps: [

    {
      content:         <div className='justify-center items-center flex flex-col '>
      <p className='font-normal text-left text-[12px] text-white'>You can change the subject and chapters </p>
    </div>,
      placement: "left",
      target: "#liveselect",
      disableBeacon: true,
    },
    {
      content:         <div className='justify-center items-center flex flex-col '>
      <p className='font-normal text-left text-[12px] text-white'>You can change the level of your understanding</p>
    </div>,
      placement: "left",
      target: "#understanding",
      disableBeacon: true,
    },
    {
      content:         <div className='justify-center items-center flex flex-col '>
      <p className='font-normal text-left text-[12px] text-white'>You can click on 'start learning' to begin</p>
    </div>,
      placement: "left",
      target: "#topics",
      disableBeacon: true,
    },
    {
      content:         <div className='justify-center items-center flex flex-col '>
      <p className='font-normal text-left text-[12px] text-white'> Navigate through all the AI Live tutor features seamlessly  </p>
    </div>,
      placement: "right",
      target: "#livebotsidebar",
      title: "Navigation bar",
      disableBeacon: true,
    },
    {
      content:         <div className='justify-center items-center flex flex-col '>
      <p className='font-normal text-left text-[12px] text-white'>You can click on 'start learning' to begin </p>
    </div>,
      placement: "left",
      target: "#startlearning",
      disableBeacon: true,
    },
  ]
});

const handleJoyrideCallback = (data) => {
  const { action, index, status, type } = data;
  if (status === STATUS.FINISHED || action === ACTIONS.SKIP) {
    localStorage.setItem('JOYRIDE','FALSE')
    setState(prevState => ({ ...prevState, run: false }));
    setLiveBotStatus("notes");
  }
};*/}


if(userLoader){
  return null
}
 else if(bot==true){
  return (
    
    <div className="md:bg-[#fff4e9] bg-white">
      <div className="pt-4 pl-6 md:block hidden">
        <Image src={logo} />
      </div>
      <div className="md:hidden flex justify-center my-5">
          <Image src={logo} />
        </div>
        <hr className="md:hidden" />
        <hr className="md:hidden"/>
      <div className="flex items-center justify-center min-h-screen ">
        {status == "page1" && (
          <>
          <div className="md:block hidden">
            <div className="flex items-center justify-center h-screen">
              <div className="relative w-[900px] h-[550px] border border-gray-300 bg-white overflow-hidden rounded-2xl">
                <div className="">
                  <Image
                    src={Tutor}
                    alt="Your Image"
                    className="absolute bottom-0 ml-48 "
                  />
                  <div className="">
                    <svg
                      className="absolute right-32 top-10 m-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="235"
                      height="159"
                      viewBox="0 0 235 159"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M219 1C227.284 1 234 7.71573 234 16V118C234 126.284 227.284 133 219 133H211C211 152.07 190.333 157.612 180 158C191.79 156.605 194.399 140.752 194.23 133H16C7.71573 133 1 126.284 1 118V16C1 7.71573 7.71573 1 16 1H219Z"
                        fill="#FFF4E9"
                      />
                      <path
                        d="M211 133H210.9V132.9H211V133ZM180 158L180.004 158.1L179.988 157.901L180 158ZM194.23 133V132.9H194.327L194.329 132.998L194.23 133ZM233.9 16C233.9 7.77096 227.229 1.1 219 1.1V0.9C227.339 0.9 234.1 7.6605 234.1 16H233.9ZM233.9 118V16H234.1V118H233.9ZM219 132.9C227.229 132.9 233.9 126.229 233.9 118H234.1C234.1 126.34 227.34 133.1 219 133.1V132.9ZM211 132.9H219V133.1H211V132.9ZM211.1 133C211.1 142.579 205.906 148.761 199.426 152.592C192.949 156.42 185.182 157.906 180.004 158.1L179.996 157.9C185.151 157.707 192.884 156.227 199.324 152.42C205.76 148.615 210.9 142.491 210.9 133H211.1ZM179.988 157.901C185.832 157.209 189.409 152.936 191.507 147.846C193.605 142.755 194.214 136.869 194.13 133.002L194.329 132.998C194.414 136.883 193.804 142.799 191.692 147.922C189.581 153.045 185.958 157.396 180.012 158.099L179.988 157.901ZM16 132.9H194.23V133.1H16V132.9ZM1.10001 118C1.10001 126.229 7.77095 132.9 16 132.9V133.1C7.66051 133.1 0.899994 126.34 0.899994 118H1.10001ZM1.10001 16V118H0.899994V16H1.10001ZM16 1.1C7.77095 1.1 1.10001 7.77096 1.10001 16H0.899994C0.899994 7.6605 7.66051 0.9 16 0.9V1.1ZM219 1.1H16V0.9H219V1.1Z"
                        fill="#FF9A33"
                      />

                      <text
                        className=""
                        x="50%"
                        y="47%"
                        dominant-baseline=""
                        text-anchor="middle"
                        fill="#000000"
                      >
                        <tspan x="39%" dy="-1.2em">
                          Hello {name} !!
                        </tspan>
                        <tspan x="51%" dy="1.2em">
                          Welcome to Live Tutor
                        </tspan>
                        <tspan x="34%" dy="1.2em">
                          one to one
                        </tspan>
                      </text>
                    </svg>
                  </div>

                  

                  <div className="absolute bottom-5 right-14 space-x-10">
                    {/* <button   onClick={() => {
                        setStatus("page2");
                      }} className="text-[#ff9a33] text-sm underline">
                      SKIP
                    </button> */}
                    <button
                      className="border border-[#ff9a33] rounded-2xl px-4 py-1 text-[#ff9a33] text-sm"
                      onClick={() => {
                        setStatus("page2");
                      }}
                    >
                      NEXT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      {/* mobile view */}
<div className="md:hidden block justify-center w-full  mx-auto ">


<div className="flex flex-col  items-center bg-white">
  <div className="section-mobile">
     
  <div className="relative w-[400px] h-[650px]  bg-white overflow-hidden rounded-2xl">
    
                <div className="text-center">
                  <div className="flex justify-center">
                  <Image
                    src={Tutor}
                    alt="Your Image"
                    className="absolute bottom-0 mt-[200px] "
                  />
                  </div>
                 
                  <div className="">
                    <svg
className="absolute right-20 m-4"                      xmlns="http://www.w3.org/2000/svg"
                      width="235"
                      height="159"
                      viewBox="0 0 235 159"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M219 1C227.284 1 234 7.71573 234 16V118C234 126.284 227.284 133 219 133H211C211 152.07 190.333 157.612 180 158C191.79 156.605 194.399 140.752 194.23 133H16C7.71573 133 1 126.284 1 118V16C1 7.71573 7.71573 1 16 1H219Z"
                        fill="#FFF4E9"
                      />
                      <path
                        d="M211 133H210.9V132.9H211V133ZM180 158L180.004 158.1L179.988 157.901L180 158ZM194.23 133V132.9H194.327L194.329 132.998L194.23 133ZM233.9 16C233.9 7.77096 227.229 1.1 219 1.1V0.9C227.339 0.9 234.1 7.6605 234.1 16H233.9ZM233.9 118V16H234.1V118H233.9ZM219 132.9C227.229 132.9 233.9 126.229 233.9 118H234.1C234.1 126.34 227.34 133.1 219 133.1V132.9ZM211 132.9H219V133.1H211V132.9ZM211.1 133C211.1 142.579 205.906 148.761 199.426 152.592C192.949 156.42 185.182 157.906 180.004 158.1L179.996 157.9C185.151 157.707 192.884 156.227 199.324 152.42C205.76 148.615 210.9 142.491 210.9 133H211.1ZM179.988 157.901C185.832 157.209 189.409 152.936 191.507 147.846C193.605 142.755 194.214 136.869 194.13 133.002L194.329 132.998C194.414 136.883 193.804 142.799 191.692 147.922C189.581 153.045 185.958 157.396 180.012 158.099L179.988 157.901ZM16 132.9H194.23V133.1H16V132.9ZM1.10001 118C1.10001 126.229 7.77095 132.9 16 132.9V133.1C7.66051 133.1 0.899994 126.34 0.899994 118H1.10001ZM1.10001 16V118H0.899994V16H1.10001ZM16 1.1C7.77095 1.1 1.10001 7.77096 1.10001 16H0.899994C0.899994 7.6605 7.66051 0.9 16 0.9V1.1ZM219 1.1H16V0.9H219V1.1Z"
                        fill="#FF9A33"
                      />

                      <text
                        className=""
                        x="50%"
                        y="47%"
                        dominant-baseline=""
                        text-anchor="middle"
                        fill="#000000"
                      >
                        <tspan x="39%" dy="-1.2em">
                        Hello {name} !!
                        </tspan>
                        <tspan x="51%" dy="1.2em">
                          Welcome to Live Tutor
                        </tspan>
                        <tspan x="34%" dy="1.2em">
                          one to one
                        </tspan>
                      </text>
                    </svg>
                  </div>

                 
                </div>
              </div>
         
        </div>
      </div>
      <div className="flex justify-center  space-x-6 py-6">
                    {/* <button  onClick={() => {
                        setStatus("page2");
                      }} className="text-[#ff9a33] text-sm underline">
                      SKIP
                    </button> */}
                    <button
                      className="border border-[#ff9a33] rounded-2xl px-4 py-1 text-[#ff9a33] text-sm"
                      onClick={() => {
                        setStatus("page2");
                      }}
                    >
                      NEXT
                    </button>
                  </div>

</div>
</>
        )}
        {status == "page2" && (
          <>
     <div className="md:block hidden">
                  <div className="flex items-center justify-center h-screen">
              <div className="relative w-[900px] h-[550px] border border-gray-300 bg-white overflow-hidden rounded-2xl">
                <div className="">
                  <Image
                    src={Tutor}
                    alt="Your Image"
                    className="absolute bottom-0 ml-8"
                  />

                  <div className="absolute left-[380px] top-[150px]">
                    <p className="font-semibold">
                      What year are you in currently?
                    </p>
                    {/* <select value={standard} onChange={(e)=>{setStandard(e.target.value)}}> */}
                    <option
  value={'10'}
  onClick={(e) => {
    setStandard(e.target.value);
    setIsStandardSelected(true);
  }}
  className={`${standard=='10'? 'bg-[#ff9a33] text-white': 'bg-gray-200'} rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
>
  Year 10
</option>
<option
  value={'11'}
  onClick={(e) => {
    setStandard(e.target.value);
    setIsStandardSelected(true);
  }}
  className={`${standard=='11'? 'bg-[#ff9a33] text-white': 'bg-gray-200'} rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
>
  Year 11
</option>
<option
  value={'12'}
  onClick={(e) => {
    setStandard(e.target.value);
    setIsStandardSelected(true);
  }}
  className={`${standard=='12'? 'bg-[#ff9a33] text-white': 'bg-gray-200'} rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
>
  Year 12
</option>
                    {/* </select> */}
                  </div>
                  <div className="absolute bottom-20 right-28 space-x-10">
                  <button
  className="border w-[250px] border-[#ff9a33] bg-[#ff9a33] rounded-2xl px-8 py-1.5 text-white text-sm"
  onClick={() => {
    if (isStandardSelected) {
      setStatus("page3"); // Update the status if an option is selected
    } else {
      alert("Please select a year before proceeding.");
    }
  }}
>
  NEXT
</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
{/* mobile view */}
<div className="md:hidden block justify-center w-full  mx-auto ">


<div className="flex flex-col  items-center bg-white">
  <div className="section-mobile">
     
  <div className="relative w-[400px] h-[650px]  bg-white overflow-hidden rounded-2xl">
    
                <div className="text-center">
                  <div className="flex justify-center">
                  <Image
                    src={Tutor}
                    alt="Your Image"
                    className="absolute ml-6 bottom-0 mt-[200px] "
                  />
                  </div>
                 
                   <div className=" flex-row justify-center ">
                    <p className="font-semibold">
                      What year are you in currently?
                    </p>
                    {/* <select value={standard} onChange={(e)=>{setStandard(e.target.value)}}> */}
                    <option
    value={'10'}
    onClick={(e) => {
      setStandard(e.target.value);
      setIsStandardSelected(true);
    }}
    className={`${standard == '10' ? 'bg-[#ff9a33] text-white' : 'bg-gray-200'} rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
  >
    Year 10
  </option>
  <option
    value={'11'}
    onClick={(e) => {
      setStandard(e.target.value);
      setIsStandardSelected(true);
    }}
    className={`${standard == '11' ? 'bg-[#ff9a33] text-white' : 'bg-gray-200'} rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
  >
    Year 11
  </option>
  <option
    value={'12'}
    onClick={(e) => {
      setStandard(e.target.value);
      setIsStandardSelected(true);
    }}
    className={`${standard == '12' ? 'bg-[#ff9a33] text-white' : 'bg-gray-200'} rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
  >
    Year 12
  </option>
                  </div>
                 
                 
                </div>
              </div>
         
        </div>
      </div>
      <div className="flex justify-center py-8">
      <button
    className="border w-[250px] border-[#ff9a33] bg-[#ff9a33] rounded-2xl px-8 py-1.5 text-white text-sm"
    onClick={() => {
      if (isStandardSelected) {
        setStatus("page3"); // Update the status if an option is selected
      } else {
        alert("Please select a year before proceeding.");
      }
    }}
  >
    NEXT
  </button>
</div>


</div>

          </>
        )}
        {status == "page3" && (
          <>
     <div className="md:block hidden">            <div className="flex items-center justify-center h-screen">
              <div className="relative w-[900px] h-[550px] border border-gray-300 bg-white overflow-hidden rounded-2xl">
                <div className="">
                  <Image
                    src={Tutor}
                    alt="Your Image"
                    className="absolute bottom-0 ml-48 "
                  />
                  <div className="">
                    <svg
                      className="absolute right-32 top-10 m-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="235"
                      height="159"
                      viewBox="0 0 235 159"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M219 1C227.284 1 234 7.71573 234 16V118C234 126.284 227.284 133 219 133H211C211 152.07 190.333 157.612 180 158C191.79 156.605 194.399 140.752 194.23 133H16C7.71573 133 1 126.284 1 118V16C1 7.71573 7.71573 1 16 1H219Z"
                        fill="#FFF4E9"
                      />
                      <path
                        d="M211 133H210.9V132.9H211V133ZM180 158L180.004 158.1L179.988 157.901L180 158ZM194.23 133V132.9H194.327L194.329 132.998L194.23 133ZM233.9 16C233.9 7.77096 227.229 1.1 219 1.1V0.9C227.339 0.9 234.1 7.6605 234.1 16H233.9ZM233.9 118V16H234.1V118H233.9ZM219 132.9C227.229 132.9 233.9 126.229 233.9 118H234.1C234.1 126.34 227.34 133.1 219 133.1V132.9ZM211 132.9H219V133.1H211V132.9ZM211.1 133C211.1 142.579 205.906 148.761 199.426 152.592C192.949 156.42 185.182 157.906 180.004 158.1L179.996 157.9C185.151 157.707 192.884 156.227 199.324 152.42C205.76 148.615 210.9 142.491 210.9 133H211.1ZM179.988 157.901C185.832 157.209 189.409 152.936 191.507 147.846C193.605 142.755 194.214 136.869 194.13 133.002L194.329 132.998C194.414 136.883 193.804 142.799 191.692 147.922C189.581 153.045 185.958 157.396 180.012 158.099L179.988 157.901ZM16 132.9H194.23V133.1H16V132.9ZM1.10001 118C1.10001 126.229 7.77095 132.9 16 132.9V133.1C7.66051 133.1 0.899994 126.34 0.899994 118H1.10001ZM1.10001 16V118H0.899994V16H1.10001ZM16 1.1C7.77095 1.1 1.10001 7.77096 1.10001 16H0.899994C0.899994 7.6605 7.66051 0.9 16 0.9V1.1ZM219 1.1H16V0.9H219V1.1Z"
                        fill="#FF9A33"
                      />

                      <text
                        className=""
                        x="50%"
                        y="47%"
                        dominant-baseline=""
                        text-anchor="middle"
                        fill="#000000"
                      >
                        <tspan x="34%" dy="-1.2em">
                          Thank You
                        </tspan>
                        <tspan x="45%" dy="1.2em">
                          for answering the
                        </tspan>
                        <tspan x="34%" dy="1.2em">
                          questions.
                        </tspan>
                      </text>
                    </svg>
                  </div>

                  <div className="absolute bottom-5 right-14 space-x-10">
                    {/* <button onClick={() => {
                        setStatus("page4");
                      }} className="text-[#ff9a33] text-sm underline">
                      SKIP
                    </button> */}
                    <button
                      className="border border-[#ff9a33] rounded-2xl px-4 py-1 text-[#ff9a33] text-sm"
                      onClick={() => {
                        setStatus("page4");
                      }}
                    >
                      NEXT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* mobile view */}
<div className="md:hidden block   justify-center w-full  mx-auto ">


<div className="flex flex-col  items-center bg-white">
  <div className="section-mobile">
     
  <div className="relative w-[400px] h-[650px]  bg-white overflow-hidden rounded-2xl">
    
                <div className="text-center">
                  <div className="flex justify-center">
                  <Image
                    src={Tutor}
                    alt="Your Image"
                    className="absolute bottom-0 mt-[200px] "
                  />
                  </div>
                
                   <div className="">
                    <svg
                      className="absolute right-20 m-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="235"
                      height="159"
                      viewBox="0 0 235 159"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M219 1C227.284 1 234 7.71573 234 16V118C234 126.284 227.284 133 219 133H211C211 152.07 190.333 157.612 180 158C191.79 156.605 194.399 140.752 194.23 133H16C7.71573 133 1 126.284 1 118V16C1 7.71573 7.71573 1 16 1H219Z"
                        fill="#FFF4E9"
                      />
                      <path
                        d="M211 133H210.9V132.9H211V133ZM180 158L180.004 158.1L179.988 157.901L180 158ZM194.23 133V132.9H194.327L194.329 132.998L194.23 133ZM233.9 16C233.9 7.77096 227.229 1.1 219 1.1V0.9C227.339 0.9 234.1 7.6605 234.1 16H233.9ZM233.9 118V16H234.1V118H233.9ZM219 132.9C227.229 132.9 233.9 126.229 233.9 118H234.1C234.1 126.34 227.34 133.1 219 133.1V132.9ZM211 132.9H219V133.1H211V132.9ZM211.1 133C211.1 142.579 205.906 148.761 199.426 152.592C192.949 156.42 185.182 157.906 180.004 158.1L179.996 157.9C185.151 157.707 192.884 156.227 199.324 152.42C205.76 148.615 210.9 142.491 210.9 133H211.1ZM179.988 157.901C185.832 157.209 189.409 152.936 191.507 147.846C193.605 142.755 194.214 136.869 194.13 133.002L194.329 132.998C194.414 136.883 193.804 142.799 191.692 147.922C189.581 153.045 185.958 157.396 180.012 158.099L179.988 157.901ZM16 132.9H194.23V133.1H16V132.9ZM1.10001 118C1.10001 126.229 7.77095 132.9 16 132.9V133.1C7.66051 133.1 0.899994 126.34 0.899994 118H1.10001ZM1.10001 16V118H0.899994V16H1.10001ZM16 1.1C7.77095 1.1 1.10001 7.77096 1.10001 16H0.899994C0.899994 7.6605 7.66051 0.9 16 0.9V1.1ZM219 1.1H16V0.9H219V1.1Z"
                        fill="#FF9A33"
                      />

                      <text
                        className=""
                        x="50%"
                        y="47%"
                        dominant-baseline=""
                        text-anchor="middle"
                        fill="#000000"
                      >
                        <tspan x="34%" dy="-1.2em">
                          Thank You
                        </tspan>
                        <tspan x="45%" dy="1.2em">
                          for answering the
                        </tspan>
                        <tspan x="34%" dy="1.2em">
                          questions.
                        </tspan>
                      </text>
                    </svg>
                  </div>

                 
                </div>
              </div>
         
        </div>
      </div>
      <div className="flex justify-center space-x-10 py-10">
                    {/* <button className="text-[#ff9a33] text-sm underline">
                      SKIP
                    </button> */}
                    <button
                      className="border border-[#ff9a33] rounded-2xl px-4 py-1 text-[#ff9a33] text-sm"
                      onClick={() => {
                        setStatus("page4");
                      }}
                    >
                      NEXT
                    </button>
                  </div>

</div>
          </>
        )}
        {status == "page4" && (
          <>
     <div className="md:block hidden">
                  <div className="flex items-center justify-center h-screen">
              <div className="relative w-[900px] h-[550px] border border-gray-300 bg-white overflow-hidden rounded-2xl">
                <div className="">
                  <Image
                    src={Tutor}
                    alt="Your Image"
                    className="absolute bottom-0 ml-8"
                  />

                  <div className="absolute left-[380px] top-[150px]">
                    <p className="font-semibold">
                    Which of the following elements is a noble gas?
                    </p>
                    {/* <select value={standard} onChange={(e)=>{setStandard(e.target.value)}}> */}
                    <option
  value={'a'}
  onClick={(e) => {
    setBiologyQuestion(e.target.value);
    setIsBiologyQuestionSelected(true);
  }}
  className={`${biologyQuestion=='a'? 'bg-[#ff9a33] text-white': 'bg-gray-200'} rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
>
  Oxygen
</option>
<option
  value={'b'}
  onClick={(e) => {
    setBiologyQuestion(e.target.value);
    setIsBiologyQuestionSelected(true);
  }}
  className={`${biologyQuestion=='b'? 'bg-[#ff9a33] text-white': 'bg-gray-200'} rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
>
  Helium
</option>
<option
  value={'c'}
  onClick={(e) => {
    setBiologyQuestion(e.target.value);
    setIsBiologyQuestionSelected(true);
  }}
  className={`${biologyQuestion=='c'? 'bg-[#ff9a33] text-white': 'bg-gray-200'} rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
>
  Sodium
</option>
<option
  value={'d'}
  onClick={(e) => {
    setBiologyQuestion(e.target.value);
    setIsBiologyQuestionSelected(true);
  }}
  className={`${biologyQuestion=='d'? 'bg-[#ff9a33] text-white': 'bg-gray-200'} rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
>
  Carbon
</option>
                    {/* </select> */}
                  </div>
                  <div className="absolute bottom-20 right-28 space-x-10">
                  <button
  className="border border-[#ff9a33] bg-[#ff9a33] rounded-2xl px-8 py-1.5 text-white text-sm"
  onClick={() => {
    if (isBiologyQuestionSelected) {
      setStatus("page5"); // Update the status if an option is selected
    } else {
      alert("Please select an answer before proceeding.");
    }
  }}
>
  NEXT
</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* mobile view */}
<div className="md:hidden block   justify-center w-full  mx-auto ">


<div className="flex flex-col   bg-white">
  <div className="section-mobile">
  <div className="relative w-[400px] h-[750px]  bg-white overflow-hidden rounded-2xl">
    
    <div className="text-center">
      <div className="flex justify-center ">
      <Image
        src={Tutor}
        alt="Your Image"
        className="absolute bottom-6 "
      />
      </div>
      
                  
                   <div className=" flex-row justify-center ">
                    
                       <p className="font-semibold ">
                    Which of the following elements is a noble gas?
                    </p>
                    <option
  value={'a'}
  onClick={(e) => {
    setBiologyQuestion(e.target.value);
    setIsBiologyQuestionSelected(true);
  }}
  className={`${biologyQuestion == 'a' ? 'bg-[#ff9a33] text-white' : 'bg-gray-200'} translate-x-6 rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
>
  Oxygen
</option>
<option
  value={'b'}
  onClick={(e) => {
    setBiologyQuestion(e.target.value);
    setIsBiologyQuestionSelected(true);
  }}
  className={`${biologyQuestion == 'b' ? 'bg-[#ff9a33] text-white' : 'bg-gray-200'} translate-x-6 rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
>
  Helium
</option>
<option
  value={'c'}
  onClick={(e) => {
    setBiologyQuestion(e.target.value);
    setIsBiologyQuestionSelected(true);
  }}
  className={`${biologyQuestion == 'c' ? 'bg-[#ff9a33] text-white' : 'bg-gray-200'} translate-x-6 rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
>
  Sodium
</option>
<option
  value={'d'}
  onClick={(e) => {
    setBiologyQuestion(e.target.value);
    setIsBiologyQuestionSelected(true);
  }}
  className={`${biologyQuestion == 'd' ? 'bg-[#ff9a33] text-white' : 'bg-gray-200'} translate-x-6 rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
>
  Carbon
</option>

                    {/* </select> */}
                  </div>
                 
                 
                </div>
              </div>
         
        </div>
      </div>
      <div className="space-x-10  flex justify-center">
  <button
    onClick={() => {
      setStatus("page5");
    }}
    className="text-[#ff9a33] text-sm underline"
  >
    SKIP
  </button>
  <button
    className="border border-[#ff9a33] rounded-2xl px-4 py-1 text-[#ff9a33] text-sm"
    onClick={() => {
      if (isBiologyQuestionSelected) {
        setStatus("page5"); // Update the status if an option is selected
      } else {
        alert("Please select an answer before proceeding.");
      }
    }}
  >
    NEXT
  </button>
</div>


</div>
          </>
        )}
             {status == "page5" && (
          <>
     <div className="md:block hidden">
                  <div className="flex items-center justify-center h-screen">
              <div className="relative w-[900px] h-[550px] border border-gray-300 bg-white overflow-hidden rounded-2xl">
                <div className="">
                  <Image
                    src={Tutor}
                    alt="Your Image"
                    className="absolute bottom-0 ml-8"
                  />

                  <div className="absolute left-[380px] top-[150px]">
                    <p className="font-semibold">
                    What is the chemical formula of methane?
                    </p>
                    {/* <select value={standard} onChange={(e)=>{setStandard(e.target.value)}}> */}
                    <option
  value={'a'}
  onClick={(e) => {
    setChemistryQuestion(e.target.value);
    setIsChemistryQuestionSelected(true);
  }}
  className={`${chemistryQuestion=='a'? 'bg-[#ff9a33] text-white': 'bg-gray-200'} rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
>
  CH3OH
</option>
<option
  value={'b'}
  onClick={(e) => {
    setChemistryQuestion(e.target.value);
    setIsChemistryQuestionSelected(true);
  }}
  className={`${chemistryQuestion=='b'? 'bg-[#ff9a33] text-white': 'bg-gray-200'} rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
>
  CH4
</option>
<option
  value={'c'}
  onClick={(e) => {
    setChemistryQuestion(e.target.value);
    setIsChemistryQuestionSelected(true);
  }}
  className={`${chemistryQuestion=='c'? 'bg-[#ff9a33] text-white': 'bg-gray-200'} rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
>
  C2H6
</option>
<option
  value={'d'}
  onClick={(e) => {
    setChemistryQuestion(e.target.value);
    setIsChemistryQuestionSelected(true);
  }}
  className={`${chemistryQuestion=='d'? 'bg-[#ff9a33] text-white': 'bg-gray-200'} rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
>
  CO2
</option>
                    {/* </select> */}
                  </div>
                  <div className="absolute bottom-20 right-28 space-x-10">
                  <button
  className="border border-[#ff9a33] bg-[#ff9a33] rounded-2xl px-8 py-1.5 text-white text-sm"
  onClick={() => {
    if (isChemistryQuestionSelected) {
      setStatus("page6"); // Update the status if an option is selected
    } else {
      alert("Please select an answer before proceeding.");
    }
  }}
>
  NEXT
</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* mobile view */}
<div className="md:hidden block   justify-center w-full  mx-auto ">


<div className="flex flex-col   bg-white">
  <div className="section-mobile">
  <div className="relative w-[400px] h-[750px]  bg-white overflow-hidden rounded-2xl">
    
    <div className="text-center">
      <div className="flex justify-center ">
      <Image
        src={Tutor}
        alt="Your Image"
        className="absolute bottom-6 "
      />
      </div>
      
                  
                   <div className=" flex-row justify-center ">
                    
                   <p className="font-semibold w-[200px] mx-auto">
  What is the chemical formula of methane?
</p>
<option
  value={'a'}
  onClick={(e) => {
    setChemistryQuestion(e.target.value);
    setIsChemistryQuestionSelected(true);
  }}
  className={`${chemistryQuestion == 'a' ? 'bg-[#ff9a33] text-white' : 'bg-gray-200'} translate-x-6 rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
>
  CH3OH
</option>
<option
  value={'b'}
  onClick={(e) => {
    setChemistryQuestion(e.target.value);
    setIsChemistryQuestionSelected(true);
  }}
  className={`${chemistryQuestion == 'b' ? 'bg-[#ff9a33] text-white' : 'bg-gray-200'} translate-x-6 rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
>
  CH4
</option>
<option
  value={'c'}
  onClick={(e) => {
    setChemistryQuestion(e.target.value);
    setIsChemistryQuestionSelected(true);
  }}
  className={`${chemistryQuestion == 'c' ? 'bg-[#ff9a33] text-white' : 'bg-gray-200'} translate-x-6 rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
>
  C2H6
</option>
<option
  value={'d'}
  onClick={(e) => {
    setChemistryQuestion(e.target.value);
    setIsChemistryQuestionSelected(true);
  }}
  className={`${chemistryQuestion == 'd' ? 'bg-[#ff9a33] text-white' : 'bg-gray-200'} translate-x-6 rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
>
  CO2
</option>
                    
                    {/* </select> */}
                  </div>
                 
                 
                </div>
              </div>
         
        </div>
      </div>
      <div className="space-x-10  flex justify-center">
  <button
    onClick={() => {
      setStatus("page6");
    }}
    className="text-[#ff9a33] text-sm underline"
  >
    SKIP
  </button>
  <button
    className="border border-[#ff9a33] rounded-2xl px-4 py-1 text-[#ff9a33] text-sm"
    onClick={() => {
      if (isChemistryQuestionSelected) {
        setStatus("page6"); // Update the status if an option is selected
      } else {
        alert("Please select an answer before proceeding.");
      }
    }}
  >
    NEXT
  </button>
</div>


</div>
          </>
        )}
              {status == "page6" && (
          <>
     <div className="md:block hidden">
                  <div className="flex items-center justify-center h-screen">
              <div className="relative w-[900px] h-[550px] border border-gray-300 bg-white overflow-hidden rounded-2xl">
                <div className="">
                  <Image
                    src={Tutor}
                    alt="Your Image"
                    className="absolute bottom-0 ml-8"
                  />

                  <div className="absolute left-[380px] top-[150px]">
                    <p className="font-semibold">
                    According to Newtons second law of motion, the force acting on an object is equal to:
                  </p>
                    {/* <select value={standard} onChange={(e)=>{setStandard(e.target.value)}}> */}
                    <option
  value={'a'}
  onClick={(e) => {
    setPhysicsQuestion(e.target.value);
    setIsPhysicsQuestionSelected(true);
  }}
  className={`${physicsQuestion=='a'? 'bg-[#ff9a33] text-white': 'bg-gray-200'} rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
>
  Its mass multiplied by its acceleration
</option>
<option
  value={'b'}
  onClick={(e) => {
    setPhysicsQuestion(e.target.value);
    setIsPhysicsQuestionSelected(true);
  }}
  className={`${physicsQuestion=='b'? 'bg-[#ff9a33] text-white': 'bg-gray-200'} rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
>
  Its velocity multiplied by time
</option>
<option
  value={'c'}
  onClick={(e) => {
    setPhysicsQuestion(e.target.value);
    setIsPhysicsQuestionSelected(true);
  }}
  className={`${physicsQuestion=='c'? 'bg-[#ff9a33] text-white': 'bg-gray-200'} rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
>
  Its displacement divided by time
</option>
<option
  value={'d'}
  onClick={(e) => {
    setPhysicsQuestion(e.target.value);
    setIsPhysicsQuestionSelected(true);
  }}
  className={`${physicsQuestion=='d'? 'bg-[#ff9a33] text-white': 'bg-gray-200'} rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
>
  Its weight divided by mass
</option>

                    {/* </select> */}
                  </div>
                  <div className="absolute bottom-20 right-28 space-x-10">
                  <button
  className="border border-[#ff9a33] bg-[#ff9a33] rounded-2xl px-8 py-1.5 text-white text-sm"
  onClick={() => {
    if (isPhysicsQuestionSelected) {
      setStatus("page7"); // Update the status if an option is selected
    } else {
      alert("Please select an answer before proceeding.");
    }
  }}
>
  NEXT
</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* mobile view */}
<div className="md:hidden block   justify-center w-full  mx-auto ">


<div className="flex flex-col   bg-white">
  <div className="section-mobile">
  <div className="relative w-[400px] h-[750px]  bg-white overflow-hidden rounded-2xl">
    
    <div className="text-center">
      <div className="flex justify-center ">
      <Image
        src={Tutor}
        alt="Your Image"
        className="absolute bottom-6 "
      />
      </div>
      
                  
                   <div className=" flex-row justify-center ">
                    
                   <p className="font-semibold">
                    According to Newtons second law of motion, the force acting on an object is equal to:
                  </p>
                    
                  <option
  value={'a'}
  onClick={(e) => {
    setPhysicsQuestion(e.target.value);
    setIsPhysicsQuestionSelected(true);
  }}
  className={`${physicsQuestion == 'a' ? 'bg-[#ff9a33] text-white' : 'bg-gray-200'} translate-x-6 rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
>
  Its mass multiplied by its acceleration
</option>
<option
  value={'b'}
  onClick={(e) => {
    setPhysicsQuestion(e.target.value);
    setIsPhysicsQuestionSelected(true);
  }}
  className={`${physicsQuestion == 'b' ? 'bg-[#ff9a33] text-white' : 'bg-gray-200'} translate-x-6 rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
>
  Its velocity multiplied by time
</option>
<option
  value={'c'}
  onClick={(e) => {
    setPhysicsQuestion(e.target.value);
    setIsPhysicsQuestionSelected(true);
  }}
  className={`${physicsQuestion == 'c' ? 'bg-[#ff9a33] text-white' : 'bg-gray-200'} translate-x-6 rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
>
  Its displacement divided by time
</option>
<option
  value={'d'}
  onClick={(e) => {
    setPhysicsQuestion(e.target.value);
    setIsPhysicsQuestionSelected(true);
  }}
  className={`${physicsQuestion == 'd' ? 'bg-[#ff9a33] text-white' : 'bg-gray-200'} translate-x-6 rounded-full py-2 text-center mt-4 text-sm cursor-pointer font-semibold text-[#232323] w-[80%]`}
>
  Its weight divided by mass
</option>

                    {/* </select> */}
                  </div>
                 
                 
                </div>
              </div>
         
        </div>
      </div>
    
      <div className="space-x-10  flex justify-center">
  <button
    onClick={() => {
      setStatus("page7");
    }}
    className="text-[#ff9a33] text-sm underline"
  >
    SKIP
  </button>
  <button
    className="border border-[#ff9a33] rounded-2xl px-4 py-1 text-[#ff9a33] text-sm"
    onClick={() => {
      if (isPhysicsQuestionSelected) {
        setStatus("page7"); // Update the status if an option is selected
      } else {
        alert("Please select an answer before proceeding.");
      }
    }}
  >
    NEXT
  </button>
</div>

</div>
          </>
        )}
        {status == "page7" && (<>
     <div className="md:block hidden">
                  <div className="flex items-center justify-center h-screen">
              <div className="relative w-[900px] h-[550px] border border-gray-300 bg-white overflow-hidden rounded-2xl">
                <div className="">
                  <Image
                    src={Tutor}
                    alt="Your Image"
                    className="absolute bottom-0 ml-48 "
                  />
                  <div className="">
                    <svg
                      className="absolute right-32 top-10 m-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="235"
                      height="159"
                      viewBox="0 0 235 159"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M219 1C227.284 1 234 7.71573 234 16V118C234 126.284 227.284 133 219 133H211C211 152.07 190.333 157.612 180 158C191.79 156.605 194.399 140.752 194.23 133H16C7.71573 133 1 126.284 1 118V16C1 7.71573 7.71573 1 16 1H219Z"
                        fill="#FFF4E9"
                      />
                      <path
                        d="M211 133H210.9V132.9H211V133ZM180 158L180.004 158.1L179.988 157.901L180 158ZM194.23 133V132.9H194.327L194.329 132.998L194.23 133ZM233.9 16C233.9 7.77096 227.229 1.1 219 1.1V0.9C227.339 0.9 234.1 7.6605 234.1 16H233.9ZM233.9 118V16H234.1V118H233.9ZM219 132.9C227.229 132.9 233.9 126.229 233.9 118H234.1C234.1 126.34 227.34 133.1 219 133.1V132.9ZM211 132.9H219V133.1H211V132.9ZM211.1 133C211.1 142.579 205.906 148.761 199.426 152.592C192.949 156.42 185.182 157.906 180.004 158.1L179.996 157.9C185.151 157.707 192.884 156.227 199.324 152.42C205.76 148.615 210.9 142.491 210.9 133H211.1ZM179.988 157.901C185.832 157.209 189.409 152.936 191.507 147.846C193.605 142.755 194.214 136.869 194.13 133.002L194.329 132.998C194.414 136.883 193.804 142.799 191.692 147.922C189.581 153.045 185.958 157.396 180.012 158.099L179.988 157.901ZM16 132.9H194.23V133.1H16V132.9ZM1.10001 118C1.10001 126.229 7.77095 132.9 16 132.9V133.1C7.66051 133.1 0.899994 126.34 0.899994 118H1.10001ZM1.10001 16V118H0.899994V16H1.10001ZM16 1.1C7.77095 1.1 1.10001 7.77096 1.10001 16H0.899994C0.899994 7.6605 7.66051 0.9 16 0.9V1.1ZM219 1.1H16V0.9H219V1.1Z"
                        fill="#FF9A33"
                      />

                      <text
                        className=""
                        x="50%"
                        y="47%"
                        dominant-baseline=""
                        text-anchor="middle"
                        fill="#000000"
                      >
                        <tspan x="50%" dy="-1.2em">
                        Thank you for response  now
                        </tspan>
                        <tspan x="45%" dy="1.2em">
                        you can proceed with
                  
                        </tspan>
                        <tspan x="43%" dy="1.2em">
                        NEET AI Tutor
                        </tspan>
                      </text>
                    </svg>
                  </div>

                  <div className="absolute bottom-5 right-14 space-x-10">
                    {/* <button   onClick={() => {
                        handleSaveUser()
                        setBot(true)

                      }} className="text-[#ff9a33] text-sm underline">
                      SKIP
                    </button> */}
                    <button
                      className="border border-[#ff9a33] rounded-2xl px-4 py-1 text-[#ff9a33] text-sm"
                      onClick={() => {
                        handleSaveUser()
                        setBot(true)

                      }}
                    >
                      Lets Start
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* mobile view */}
<div className="md:hidden block   justify-center w-full  mx-auto ">


<div className="flex flex-col  items-center bg-white">
  <div className="section-mobile">
     
  <div className="relative w-[400px] h-[650px]  bg-white overflow-hidden rounded-2xl">
    
                <div className="text-center">
                  <div className="flex justify-center">
                  <Image
                    src={Tutor}
                    alt="Your Image"
                    className="absolute bottom-0 mt-[200px] "
                  />
                  </div>
                  
                 <div className="">
                    <svg
className="absolute right-20 m-4"                      xmlns="http://www.w3.org/2000/svg"
                      width="235"
                      height="159"
                      viewBox="0 0 235 159"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M219 1C227.284 1 234 7.71573 234 16V118C234 126.284 227.284 133 219 133H211C211 152.07 190.333 157.612 180 158C191.79 156.605 194.399 140.752 194.23 133H16C7.71573 133 1 126.284 1 118V16C1 7.71573 7.71573 1 16 1H219Z"
                        fill="#FFF4E9"
                      />
                      <path
                        d="M211 133H210.9V132.9H211V133ZM180 158L180.004 158.1L179.988 157.901L180 158ZM194.23 133V132.9H194.327L194.329 132.998L194.23 133ZM233.9 16C233.9 7.77096 227.229 1.1 219 1.1V0.9C227.339 0.9 234.1 7.6605 234.1 16H233.9ZM233.9 118V16H234.1V118H233.9ZM219 132.9C227.229 132.9 233.9 126.229 233.9 118H234.1C234.1 126.34 227.34 133.1 219 133.1V132.9ZM211 132.9H219V133.1H211V132.9ZM211.1 133C211.1 142.579 205.906 148.761 199.426 152.592C192.949 156.42 185.182 157.906 180.004 158.1L179.996 157.9C185.151 157.707 192.884 156.227 199.324 152.42C205.76 148.615 210.9 142.491 210.9 133H211.1ZM179.988 157.901C185.832 157.209 189.409 152.936 191.507 147.846C193.605 142.755 194.214 136.869 194.13 133.002L194.329 132.998C194.414 136.883 193.804 142.799 191.692 147.922C189.581 153.045 185.958 157.396 180.012 158.099L179.988 157.901ZM16 132.9H194.23V133.1H16V132.9ZM1.10001 118C1.10001 126.229 7.77095 132.9 16 132.9V133.1C7.66051 133.1 0.899994 126.34 0.899994 118H1.10001ZM1.10001 16V118H0.899994V16H1.10001ZM16 1.1C7.77095 1.1 1.10001 7.77096 1.10001 16H0.899994C0.899994 7.6605 7.66051 0.9 16 0.9V1.1ZM219 1.1H16V0.9H219V1.1Z"
                        fill="#FF9A33"
                      />

                      <text
                        className=""
                        x="50%"
                        y="47%"
                        dominant-baseline=""
                        text-anchor="middle"
                        fill="#000000"
                      >
                        <tspan x="50%" dy="-1.2em">
                          Thank you for response 
                        </tspan>
                        <tspan x="50%" dy="1.4em">
                        now you can proceed with                        </tspan>
                     
                        <tspan x="45%" dy="1.2em">
                          NEET AI Tutor
                        </tspan>
                        <tspan x="43%" dy="1.2em">
                        </tspan>
                      </text>
                    </svg>
                  </div>

                 
                </div>
              </div>
         
        </div>
      </div>
      <div className="flex justify-center space-x-10 py-10">
                    {/* <button className="text-[#ff9a33] text-sm underline">
                      SKIP
                    </button> */}
                    <button
                      className="border border-[#ff9a33] rounded-2xl px-4 py-1 text-[#ff9a33] text-sm"
                      onClick={() => {
                        handleSaveUser()
                        setBot(true)
                      }}
                    >
                      NEXT
                    </button>
                  </div>

</div>
          </>
        )}
      </div>
    </div>
  );}
  else{
    return (
       
    <>
    {/*{localStorage.getItem('JOYRIDE')!='FALSE' && 

<Joyride
        steps={steps}
        continuous={true} 
        run={run}
        callback={handleJoyrideCallback}
        disableOverlayClose={true} // Disable closing the Joyride with overlay click
        styles={{
          options: {
            arrowColor: 'white',
            overlayColor: 'rgba(0, 0, 0, 0.8)',
            primaryColor: '#000',
            textColor: 'white',
            fontWeight: 'bold',
            fontSize: '20px',
            width: 400,
            zIndex: 1000,
          },
          tooltip: {
            width: '252px',
            height: '161px',
            backgroundColor: 'transparent',
          },
          buttonNext: {
            backgroundColor: 'transparent', 
            border: 'white ,solid, 2px',
            color: 'white', 
            borderRadius: '10px'
          },
          buttonBack: {
            backgroundColor: 'transparent', 
            border: 'white ,solid, 2px',
            color: 'white', 
            borderRadius: '10px'
          },
          buttonSkip: {
            backgroundColor: 'transparent', 
            border: 'white ,solid, 2px',
            color: 'white', 
            borderRadius: '10px'
          },
          title: {
            color: 'white',
          }          
      
        }}
        hideCloseButton
        scrollToFirstStep
        showSkipButton
        hideBackButton

      />
      }*/}
   
        <SidebarHead setLiveBotStatus={setLiveBotStatus} liveBotStatus={liveBotStatus} timer={sessionStarted}/>
    <div className="flex  ">

    <SidebarLiveBot id="livebotsidebar" setSessionStarted={setSessionStarted}  sessionStarted={sessionStarted} activeTab={liveBotStatus} setActiveTab={setLiveBotStatus}/>
  {liveBotStatus=='home' && <Home topicIndex={topicIndex} setTopicIndex={setTopicIndex} setTopicNames={setTopicNames}  mstatus={mstatus} msetStatus={msetStatus}  startSession={startSession} setLiveBotStatus={setLiveBotStatus} selectedTopic={selectedTopic} data={data} chemistryChapter={chemistryChapter} physicsChapter={physicsChapter} biologyChapter={biologyChapter} selectSubject={selectSubject} topicName={topicName} selectChapter={selectChapter} setSelectChapter={setSelectChapter} setSelectedTopic={setSelectedTopic} extractTopicNames={extractTopicNames} setSelectSubject={setSelectSubject} loader={loader}/>}
  {liveBotStatus=='notes' &&   <Notes/>}
  {liveBotStatus=='history' &&   <History/>}
{liveBotStatus=='study' && <Study topicIndex={topicIndex} mstatus={mstatus} msetStatus={msetStatus} liveBotStatus={liveBotStatus} setLiveBotStatus={setLiveBotStatus} phone={num} data={data} selectSubject={selectSubject} topicName={topicName} selectChapter={selectChapter}/>}
  </div>

    </>
    )
  }
};

export default LiveBot;
