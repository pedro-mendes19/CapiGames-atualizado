/**
 * @fileoverview Módulo de dados dos animais para o jogo "Quem Sou Eu?"
 * Contém um array de objetos com pistas progressivas (difícil → fácil),
 * metadados de imagem, curiosidades e níveis de dificuldade.
 * @module AnimalData
 */

'use strict';

/**
 * @typedef {Object} Animal
 * @property {number} id - Identificador único.
 * @property {string} name - Nome comum do animal (PT-BR).
 * @property {string} scientificName - Nomenclatura binomial.
 * @property {string[]} clues - Pistas progressivas, da mais difícil à mais fácil.
 * @property {string} imageQuery - Termo de busca no Unsplash.
 * @property {string} funFact - Curiosidade exibida ao final da rodada.
 * @property {string} difficulty - Nível: 'difícil', 'médio' ou 'fácil'.
 * @property {string} silhouetteColor - Gradiente CSS para o placeholder de fallback.
 */

/** @type {Animal[]} */
const ANIMAL_DATA = [
  {
    id: 1,
    name: "Leão",
    scientificName: "Panthera leo",
    clues: [
      "Pertenço à família Felidae e sou uma das únicas quatro espécies do meu gênero capazes de rugir.",
      "Sou o único felino que vive em grupos sociais organizados, chamados de bandos.",
      "Os machos da minha espécie são famosos por um anel distinto de pelos ao redor da cabeça e do pescoço, chamado juba.",
      "Muitas vezes sou chamado de 'Rei da Selva', embora na verdade eu prefira as savanas abertas.",
      "Sou um grande predador de pelagem dourada, nativo da África, com um rugido poderoso."
    ],
    imageQuery: "lion wildlife portrait",
    funFact: "O rugido de um leão pode ser ouvido a até 8 quilômetros de distância, sendo o mais alto entre todos os grandes felinos.",
    difficulty: "fácil",
    silhouetteColor: "linear-gradient(135deg, #d4a056, #8b6914)"
  },
  {
    id: 2,
    name: "Polvo",
    scientificName: "Octopus vulgaris",
    clues: [
      "Tenho três corações: dois bombeiam sangue para as brânquias e um bombeia para o resto do corpo.",
      "Meu sangue é azul porque utiliza hemocianina à base de cobre, em vez de hemoglobina à base de ferro.",
      "Sou considerado um dos invertebrados mais inteligentes e consigo resolver quebra-cabeças complexos.",
      "Tenho a notável capacidade de mudar a cor, a textura e o padrão da minha pele em milissegundos.",
      "Sou uma criatura marinha de corpo mole com oito braços flexíveis cobertos de ventosas."
    ],
    imageQuery: "octopus underwater close-up",
    funFact: "Um polvo tem cerca de 500 milhões de neurônios — quase o mesmo que um cão — e dois terços deles ficam localizados nos braços.",
    difficulty: "médio",
    silhouetteColor: "linear-gradient(135deg, #6b3fa0, #e8445a)"
  },
  {
    id: 3,
    name: "Pinguim",
    scientificName: "Aptenodytes forsteri",
    clues: [
      "Sou uma das poucas espécies de aves com ossos sólidos e densos — uma adaptação para mergulhos profundos.",
      "Os machos da minha espécie incubam o ovo sobre os pés por mais de dois meses sem comer.",
      "Consigo mergulhar a profundidades superiores a 500 metros e prender a respiração por mais de 20 minutos.",
      "Sou uma ave que não voa, mas 'voo' debaixo d'água usando minhas asas como poderosas nadadeiras.",
      "Sou uma ave preta e branca que caminha gingando no gelo e vive em grandes colônias na Antártida."
    ],
    imageQuery: "emperor penguin antarctica",
    funFact: "Pinguins-imperadores podem sobreviver a temperaturas de até -60°C, aglomerando-se em grupos de milhares para se aquecer.",
    difficulty: "fácil",
    silhouetteColor: "linear-gradient(135deg, #1a1a2e, #4a90d9)"
  },
  {
    id: 4,
    name: "Camaleão",
    scientificName: "Chamaeleo calyptratus",
    clues: [
      "Meus olhos podem girar independentemente, me dando um arco de visão de 360 graus sem mover a cabeça.",
      "Ao contrário do que muitos pensam, mudo de cor principalmente para comunicar humor e regular a temperatura, não para camuflagem.",
      "Capturo presas lançando minha língua a velocidades superiores a 20 vezes o comprimento do meu corpo por segundo.",
      "Tenho pés zigodáctilos — dedos fundidos em dois grupos opostos — perfeitos para agarrar galhos.",
      "Sou um réptil lento que muda de cor, frequentemente encontrado em florestas tropicais e desertos."
    ],
    imageQuery: "chameleon colorful close-up",
    funFact: "A língua de um camaleão pode ter até o dobro do comprimento do seu corpo e acelera de 0 a 100 km/h em apenas 1/100 de segundo.",
    difficulty: "médio",
    silhouetteColor: "linear-gradient(135deg, #2ecc71, #f1c40f)"
  },
  {
    id: 5,
    name: "Golfinho",
    scientificName: "Tursiops truncatus",
    clues: [
      "Durmo com um hemisfério cerebral de cada vez, mantendo um olho aberto para vigiar predadores.",
      "Uso ecolocalização para navegar e caçar, emitindo cliques que ricocheteiam nos objetos e voltam para mim.",
      "Apesar de viver no oceano, sou um mamífero de sangue quente que respira ar por um orifício no topo da cabeça.",
      "Sou conhecido pela minha alta inteligência, comportamento brincalhão e estruturas sociais complexas em grupos chamados manadas.",
      "Sou um mamífero marinho elegante e cinza, famoso por saltar para fora da água e surfar nas ondas."
    ],
    imageQuery: "dolphin jumping ocean",
    funFact: "Golfinhos emitem 'assobios-assinatura' únicos entre si — essencialmente, eles se chamam pelo nome.",
    difficulty: "fácil",
    silhouetteColor: "linear-gradient(135deg, #3498db, #1abc9c)"
  },
  {
    id: 6,
    name: "Águia",
    scientificName: "Aquila chrysaetos",
    clues: [
      "Minha acuidade visual é estimada entre 4 a 8 vezes mais nítida do que a de um humano médio.",
      "Consigo avistar um coelho a mais de 3 quilômetros de distância graças a um milhão de fotorreceptores por milímetro quadrado na minha retina.",
      "Construo ninhos enormes chamados ninhais, frequentemente reutilizando-os e expandindo-os a cada ano — alguns pesam mais de uma tonelada.",
      "Sou uma das aves de rapina mais poderosas, capaz de mergulhar a velocidades superiores a 240 km/h.",
      "Sou uma ave de rapina majestosa com um grande bico curvo e envergadura imponente, símbolo de poder em todo o mundo."
    ],
    imageQuery: "golden eagle portrait wildlife",
    funFact: "Águias conseguem enxergar cinco cores básicas, incluindo luz ultravioleta, revelando padrões invisíveis aos olhos humanos.",
    difficulty: "fácil",
    silhouetteColor: "linear-gradient(135deg, #8b6914, #2c1810)"
  },
  {
    id: 7,
    name: "Raposa",
    scientificName: "Vulpes vulpes",
    clues: [
      "Uso o campo magnético da Terra para caçar, alinhando meu bote ao nordeste para máxima precisão sob a neve.",
      "Minha audição é tão aguçada que consigo detectar um relógio tiquetaqueando a 36 metros de distância.",
      "Sou o carnívoro selvagem com a distribuição geográfica mais ampla do planeta, encontrado em todos os continentes, exceto a Antártida.",
      "Tenho pupilas verticais em fenda, semelhantes às de um gato, que me ajudam a enxergar bem em condições de pouca luz.",
      "Sou um canídeo esguio de cauda peluda e pelos ruivo-alaranjados, frequentemente retratado em fábulas como esperto e astuto."
    ],
    imageQuery: "red fox wildlife forest",
    funFact: "Raposas-vermelhas utilizam mais de 40 vocalizações diferentes para se comunicar, e seu grito pode ser ouvido a até 5 km de distância.",
    difficulty: "médio",
    silhouetteColor: "linear-gradient(135deg, #e74c3c, #d35400)"
  },
  {
    id: 8,
    name: "Urso-Polar",
    scientificName: "Ursus maritimus",
    clues: [
      "Minha pele é na verdade preta, o que ajuda a absorver calor, e cada fio do meu pelo é um tubo oco e transparente.",
      "Sou classificado como mamífero marinho porque dependo do oceano — especificamente do gelo marinho — para sobreviver.",
      "Consigo nadar continuamente por dias; o recorde é de mais de 680 quilômetros em mar aberto no Ártico.",
      "Meu olfato pode detectar presas a quase 1,6 quilômetro de distância e até 1 metro sob neve compactada.",
      "Sou o maior carnívoro terrestre, com pelos que parecem brancos, vivendo no Ártico gelado."
    ],
    imageQuery: "polar bear arctic wildlife",
    funFact: "O pelo do urso-polar parece branco, mas na verdade é transparente — ele só aparenta ser branco porque reflete a luz visível, assim como a neve.",
    difficulty: "fácil",
    silhouetteColor: "linear-gradient(135deg, #ecf0f1, #bdc3c7)"
  },
  {
    id: 9,
    name: "Tartaruga-Marinha",
    scientificName: "Chelonia mydas",
    clues: [
      "Navego milhares de quilômetros através dos oceanos usando o campo magnético da Terra como uma bússola interna.",
      "As fêmeas da minha espécie retornam à praia exata onde nasceram para desovar, décadas depois.",
      "A temperatura da areia determina o sexo dos meus filhotes — ninhos mais quentes produzem mais fêmeas.",
      "Estou na Terra há mais de 100 milhões de anos, tendo sobrevivido aos dinossauros.",
      "Sou um grande e antigo réptil marinho com nadadeiras e um casco resistente que migra por vastas distâncias oceânicas."
    ],
    imageQuery: "green sea turtle underwater",
    funFact: "Tartarugas-marinhas podem prender a respiração por até 7 horas enquanto dormem debaixo d'água, diminuindo a frequência cardíaca para uma batida a cada 9 minutos.",
    difficulty: "médio",
    silhouetteColor: "linear-gradient(135deg, #27ae60, #2980b9)"
  },
  {
    id: 10,
    name: "Coruja",
    scientificName: "Bubo bubo",
    clues: [
      "Meu pescoço contém 14 vértebras — o dobro de um humano — permitindo que eu gire a cabeça até 270 graus.",
      "Minhas penas de voo possuem serrações em forma de pente que quebram a turbulência, tornando meu voo praticamente silencioso.",
      "Meus olhos não são esféricos, mas tubos alongados, fixos nas órbitas, e por isso preciso girar toda a cabeça para olhar ao redor.",
      "Consigo ouvir o batimento cardíaco de um rato a 20 metros de distância, graças a ouvidos posicionados assimetricamente que triangulam o som.",
      "Sou uma ave de rapina noturna com grandes olhos frontais e um rosto achatado em forma de disco."
    ],
    imageQuery: "owl close-up portrait wildlife",
    funFact: "Corujas não conseguem mastigar: elas engolem a presa inteira e depois regurgitam pelotas compactas de ossos, pelos e penas.",
    difficulty: "fácil",
    silhouetteColor: "linear-gradient(135deg, #8e6e53, #f39c12)"
  },
  {
    id: 11,
    name: "Elefante",
    scientificName: "Loxodonta africana",
    clues: [
      "Comunico-me usando infrassom — vibrações tão baixas quanto 14 Hz — que viajam pelo solo e são detectadas por outros da minha espécie através dos pés.",
      "Sou um dos poucos animais que consegue se reconhecer em um espelho, demonstrando autoconsciência.",
      "Meu cérebro pesa cerca de 5 kg e possuo uma notável memória de longo prazo, lembrando de lugares e indivíduos por décadas.",
      "Tenho o período de gestação mais longo entre os mamíferos terrestres: aproximadamente 22 meses.",
      "Sou o maior animal terrestre vivo, com uma longa tromba, grandes orelhas e presas feitas de marfim."
    ],
    imageQuery: "african elephant wildlife savanna",
    funFact: "Elefantes são os únicos animais que não conseguem pular, mas podem detectar vibrações sísmicas pelos pés a mais de 50 km de distância.",
    difficulty: "fácil",
    silhouetteColor: "linear-gradient(135deg, #7f8c8d, #2c3e50)"
  },
  {
    id: 12,
    name: "Beija-Flor",
    scientificName: "Trochilidae",
    clues: [
      "Meu coração bate até 1.260 vezes por minuto, e eu entro em um estado semelhante à hibernação chamado torpor todas as noites para economizar energia.",
      "Sou a única ave que consegue voar para trás, de cabeça para baixo e pairar no ar, girando as asas em formato de oito.",
      "Preciso consumir cerca de metade do meu peso corporal em açúcar diariamente e visitar entre 1.000 e 2.000 flores.",
      "Apesar de pesar menos que uma moeda, algumas espécies da minha família migram mais de 3.000 km sem parar, cruzando o Golfo do México.",
      "Sou uma ave minúscula e iridescente que bate as asas até 80 vezes por segundo, produzindo um zumbido característico."
    ],
    imageQuery: "hummingbird flower close-up",
    funFact: "O cérebro de um beija-flor representa 4,2% do seu peso corporal — a maior proporção entre todas as aves — proporcionando memória excepcional para a localização de flores.",
    difficulty: "médio",
    silhouetteColor: "linear-gradient(135deg, #1abc9c, #9b59b6)"
  },
  {
    id: 13,
    name: "Lobo",
    scientificName: "Canis lupus",
    clues: [
      "Minha força de mordida é de cerca de 400 PSI, e minhas mandíbulas são projetadas para esmagar ossos grandes e acessar a medula.",
      "Vivo em uma hierarquia social complexa dentro da minha alcateia e me comunico por um sistema de uivos, cada um com uma assinatura vocal única.",
      "Consigo correr a velocidades sustentadas de 60 km/h durante uma perseguição e percorrer até 70 quilômetros em um único dia.",
      "Meu olfato é aproximadamente 100 vezes mais sensível que o de um humano, e consigo detectar presas a mais de 2,5 km de distância.",
      "Sou um grande canídeo social que caça em alcateias e uiva à noite, historicamente temido no folclore mundial."
    ],
    imageQuery: "gray wolf wildlife portrait",
    funFact: "Lobos uivam em tons diferentes propositalmente para criar a ilusão de que a alcateia é maior do que realmente é — uma engenhosa enganação acústica.",
    difficulty: "fácil",
    silhouetteColor: "linear-gradient(135deg, #636e72, #2d3436)"
  },
  {
    id: 14,
    name: "Flamingo",
    scientificName: "Phoenicopterus roseus",
    clues: [
      "Nasço com penas cinza-esbranquiçadas; minha cor icônica se desenvolve ao longo de 2-3 anos a partir de pigmentos carotenoides nos crustáceos e algas que como.",
      "Como com a cabeça de cabeça para baixo, usando meu bico de formato único como filtro para separar alimentos da água e da lama.",
      "Consigo ficar de pé sobre uma perna por horas, e cientistas acreditam que isso é mais eficiente energeticamente do que ficar sobre duas.",
      "Vivo em colônias enormes que podem chegar a centenas de milhares de indivíduos em lagos alcalinos ou salinos.",
      "Sou uma ave pernalta e rosa, com pernas longas, pescoço curvo e um bico curvado para baixo muito característico."
    ],
    imageQuery: "flamingo pink wildlife lake",
    funFact: "Flamingos produzem um 'leite de papo' vermelho-sangue para alimentar seus filhotes — sendo uma de apenas três espécies de aves a fazer isso.",
    difficulty: "fácil",
    silhouetteColor: "linear-gradient(135deg, #fd79a8, #e17055)"
  },
  {
    id: 15,
    name: "Coala",
    scientificName: "Phascolarctos cinereus",
    clues: [
      "Tenho impressões digitais praticamente indistinguíveis das humanas, mesmo sob microscopia eletrônica.",
      "Durmo até 22 horas por dia porque minha dieta é tão pobre em nutrientes que preciso conservar cada caloria.",
      "Apesar da aparência fofa, não sou um urso — sou um marsupial que carrega seus filhotes em uma bolsa.",
      "Tenho um sistema digestivo especializado com um ceco de mais de 2 metros de comprimento para decompor compostos tóxicos do eucalipto.",
      "Sou um marsupial australiano rechonchudo e de orelhas arredondadas que se agarra em árvores de eucalipto e dorme a maior parte do dia."
    ],
    imageQuery: "koala tree eucalyptus wildlife",
    funFact: "Coalas têm um dos menores cérebros em relação ao peso corporal entre todos os mamíferos — ele preenche apenas 61% da cavidade craniana.",
    difficulty: "médio",
    silhouetteColor: "linear-gradient(135deg, #a29bfe, #636e72)"
  }
];
