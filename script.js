// ELEMENTOS DEL DOM

const sceneImage = document.getElementById("scene-image");

const dialogText = document.getElementById("dialog-text");

const choicesContainer =
document.getElementById("choices-container");

const timerElement =
document.getElementById("timer");

const dramaElement =
document.getElementById("drama");

const bgMusic = document.getElementById("bgMusic");

console.log("Audio:", bgMusic);

// VARIABLES DEL JUEGO

let drama = 0;

let tiempo = 120;

let escenaActual = null;

let dialogoActual = 0;

let temporizador;

let musicaIniciada = false;

// ACTUALIZAR DRAMA

function actualizarDrama() {

    dramaElement.textContent = drama;

    if (drama >= 100) {

        clearInterval(
            temporizador
        );

        mostrarEscena(
            escenas.reinaDrama
        );

        if (!musicaIniciada) {

    bgMusic.volume = 0.3;

    bgMusic.play().catch(error => {
        console.log("Error al reproducir música:", error);
    });

    musicaIniciada = true;
}

        return;
    }

}

// TEMPORIZADOR

function iniciarTemporizador() {

    temporizador = setInterval(() => {

        tiempo--;

        timerElement.textContent =
            tiempo;

        if (tiempo <= 0) {

            clearInterval(
                temporizador
            );

            mostrarEscena(
                escenas.tiempoAgotado
            );

        }

    }, 1000);

}

// MOSTRAR ESCENA

function mostrarEscena(escena) {

    if (!escena) {

        console.error(
            "Escena no encontrada"
        );

        return;

    }

    escenaActual = escena;

    dialogoActual = 0;

    sceneImage.src =
        escena.imagen;

    console.log(
        "Imagen cargada:",
        escena.imagen
    );

    mostrarDialogo();
}

// MOSTRAR DIÁLOGO

function mostrarDialogo() {

    dialogText.innerHTML =
        escenaActual.dialogos[
            dialogoActual
        ];

    choicesContainer.innerHTML = "";

    const btnSiguiente =
        document.createElement("button");

    btnSiguiente.textContent =
        "Siguiente";

    btnSiguiente.classList.add(
        "choice-btn"
    );

    btnSiguiente.addEventListener(
        "click",
        siguienteDialogo
    );

    choicesContainer.appendChild(
        btnSiguiente
    );

}

// SIGUIENTE DIÁLOGO

function siguienteDialogo() {

    dialogoActual++;

    if (
        dialogoActual <
        escenaActual.dialogos.length
    ) {

        dialogText.innerHTML =
            escenaActual.dialogos[
                dialogoActual
            ];

    }

    else {

        mostrarOpciones();

    }

}

// MOSTRAR OPCIONES

function mostrarOpciones() {

    choicesContainer.innerHTML = "";

    escenaActual.opciones.forEach(
        opcion => {

            const boton =
                document.createElement(
                    "button"
                );

            boton.textContent =
                opcion.texto;

            boton.classList.add(
                "choice-btn"
            );

            boton.addEventListener(
                "click",
                () => {

                    if (
                        opcion.drama
                    ) {

                        drama +=
                            opcion.drama;

                        actualizarDrama();

                    }

                    mostrarEscena(
            escenas[opcion.siguiente]
);

                }
            );

            choicesContainer.appendChild(
                boton
            );

        }
    );

}

// BOTÓN INICIO

document
    .getElementById("btn-start")
    .addEventListener(
        "click",
        () => {

            mostrarEscena(escenas.inicio);

            document.addEventListener("click", () => {

            bgMusic.volume = 0.3;
            bgMusic.play();

}, { once: true });

            iniciarTemporizador();

            mostrarEscena(
                escenas.portada
            );

        }
    );

// AQUÍ IRÁN LAS 21 ESCENAS

const escenas = {

    portada: {
        imagen: "img/02_portada.png",
        dialogos: [
            "Durante meses habías imaginado este momento.",
            "Las conversaciones, las sonrisas y las miradas parecían significar algo más.",
            "Hoy por fin has reunido el valor para decirle a Daniel lo que sientes.",
            "Pero no tienes idea de que esta tarde cambiará todo."
        ],
        opciones: [
            {
                texto: "Ir a la cafetería",
                drama: 0,
                siguiente: "cafeteria"
            }
        ]
    },
        cafeteria: {
        imagen: "img/03_cafeteria_inicio.png",
        dialogos: [
            "Empujas la puerta de la cafetería.",
            "El aroma a café recién hecho te envuelve.",
            "Entonces lo ves.",
            "Daniel está abrazando a una chica desconocida."
        ],
        opciones: [
            {
                texto: "Espiar",
                drama: 20,
                siguiente: "espiar"
            },
            {
                texto: "Acercarte",
                drama: -5,
                siguiente: "acercarse"
            }
        ]
    },

    espiar: {
        imagen: "img/04_espiar.png",
        dialogos: [
            "Te escondes detrás de una estantería.",
            "No te sientes orgullosa de ello.",
            "Escuchas una frase inquietante.",
            "\"No puedo seguir ocultándolo...\""
        ],
        opciones: [
            {
                texto: "Seguir escuchando",
                drama: 20,
                siguiente: "claraSeVa"
            },
            {
                texto: "Interrumpir",
                drama: 10,
                siguiente: "claraSeVa"
            }
        ]
    },

    acercarse: {
        imagen: "img/05_acercarse.png",
        dialogos: [
            "Respiras hondo.",
            "Te acercas a la mesa.",
            "Daniel parece sorprendido.",
            "La chica deja de hablar inmediatamente."
        ],
        opciones: [
            {
                texto: "Continuar",
                drama: -10,
                siguiente: "claraSeVa"
            }
        ]
    },

    claraSeVa: {
        imagen: "img/06_clara_se_va.png",
        dialogos: [
            "Clara se levanta.",
            "Parece contener las lágrimas.",
            "Sale de la cafetería sin mirar atrás.",
            "Sobre la mesa queda un sobre olvidado."
        ],
        opciones: [
            {
                texto: "Abrir el sobre",
                drama: 20,
                siguiente: "sobre"
            },
            {
                texto: "Dejarlo",
                drama: -10,
                siguiente: "explicacion"
            }
        ]
    },

    sobre: {
        imagen: "img/07_sobre_misterioso.png",
        dialogos: [
            "Tus manos tiemblan.",
            "Sabes que no deberías hacerlo.",
            "Pero la curiosidad te vence.",
            "Abres el sobre."
        ],
        opciones: [
            {
                texto: "Ver la fotografía",
                drama: 20,
                siguiente: "fotografia"
            }
        ]
    },

    fotografia: {
        imagen: "img/08_foto_antigua.png",
        dialogos: [
            "Dentro hay una fotografía antigua.",
            "Daniel aparece abrazando a una chica.",
            "\"Siempre volveré contigo\".",
            "Tu corazón se encoge."
        ],
        opciones: [
            {
                texto: "Acusar a Daniel",
                drama: 20,
                siguiente: "confrontacion"
            },
            {
                texto: "Preguntar primero",
                drama: -10,
                siguiente: "explicacion"
            }
        ]
    },

    confrontacion: {
        imagen: "img/09_confrontacion.png",
        dialogos: [
            "Enfrentas a Daniel.",
            "Exiges respuestas.",
            "Él parece dolido.",
            "\"No sabes toda la historia\"."
        ],
        opciones: [
            {
                texto: "Escuchar",
                drama: -10,
                siguiente: "explicacion"
            },
            {
                texto: "Marcharte enfadada",
                drama: 20,
                siguiente: "finalTriste"
            }
        ]
    },

    explicacion: {
        imagen: "img/10_explicacion_daniel.png",
        dialogos: [
            "\"Necesitas escucharme\".",
            "\"Clara no es mi novia\".",
            "\"Hay mucho que no sabes\".",
            "Por primera vez dudas de tus conclusiones."
        ],
        opciones: [
            {
                texto: "Escuchar atentamente",
                drama: -10,
                siguiente: "hermana"
            },
            {
                texto: "Seguir desconfiando",
                drama: 20,
                siguiente: "finalChisme"
            }
        ]
    },

    hermana: {
        imagen: "img/11_revelacion_hermana.png",
        dialogos: [
            "\"Clara es mi hermana\".",
            "Te quedas inmóvil.",
            "Todo empieza a tener sentido.",
            "Quizá te equivocaste."
        ],
        opciones: [
            {
                texto: "Pedir disculpas",
                drama: -10,
                siguiente: "exnovia"
            },
            {
                texto: "Preguntar por la foto",
                drama: 10,
                siguiente: "exnovia"
            }
        ]
    },

    exnovia: {
    imagen: "img/12_exnovia_misteriosa.png",

    dialogos: [
        "La puerta se abre.",
        "Una mujer entra en la cafetería.",
        "Daniel palidece al verla.",
        "\"¿Todavía no le has contado la verdad?\""
    ],

    opciones: [
        {
            texto: "Exigir explicaciones",
            drama: 20,
            siguiente: "laVerdad"
        },
        {
            texto: "Escuchar primero",
            drama: -10,
            siguiente: "laVerdad"
        }
    ]
},

    laVerdad: {
    imagen: "img/13_la_verdad.png",

    dialogos: [
        "El silencio se apodera de la cafetería.",
        "La mujer suspira profundamente.",
        "\"Soy Lucía.\"",
        "\"La exnovia de Daniel.\"",
        "\"Y la razón por la que desaparecí fue porque me marché a otro país.\"",
        "\"Daniel nunca me engañó.\"",
        "\"Fui yo quien rompió la relación.\""
    ],

    opciones: [
        {
            texto: "Creer a Daniel",
            drama: -20,
            siguiente: "confesion"
        },
        {
            texto: "Seguir desconfiando",
            drama: 20,
            siguiente: "ultimaDecision"
        }
    ]
},

confesion: {
    imagen: "img/14_confesion.png",

    dialogos: [
        "Por primera vez todo encaja.",
        "Las piezas del rompecabezas encuentran su lugar.",
        "Daniel te mira.",
        "\"¿Y ahora qué?\"",
        "Tu corazón late con fuerza."
    ],

    opciones: [
        {
            texto: "Confesar tus sentimientos",
            drama: -10,
            siguiente: "finalRomantico"
        },
        {
            texto: "Pedir tiempo para pensar",
            drama: 10,
            siguiente: "finalAmigos"
        }
    ]
},

ultimaDecision: {
    imagen: "img/15_ultima_decision.png",

    dialogos: [
        "Sigues teniendo dudas.",
        "Quizá la verdad ya está delante de ti.",
        "Quizá simplemente no quieres verla.",
        "Debes tomar una última decisión."
    ],

    opciones: [
        {
            texto: "Alejarte",
            drama: 10,
            siguiente: "finalTriste"
        },
        {
            texto: "Seguir investigando",
            drama: 20,
            siguiente: "finalChisme"
        }
    ]
},

finalRomantico: {

    imagen: "img/13_final_romantico.png",

    dialogos: [
        "\"Daniel... me gustas.\"",
        "Durante unos segundos el mundo parece detenerse.",
        "Daniel sonríe.",
        "\"Creía que nunca me lo dirías.\""
    ],

    opciones: [
        {
            texto: "Continuar",
            siguiente: "finalFeliz"
        }
    ]
},

    finalFeliz: {

    imagen: "img/15_final_feliz.png",

    dialogos: [
        "\"¿Capuchino para dos?\"",
        "\"Siempre\".",
        "Los secretos quedan atrás.",
        "Comienza una nueva historia."
    ],

    opciones: [
        {
            texto: "🔄 Volver a jugar",
            siguiente: "portada"
        }
    ]
},

    finalTriste: {
    imagen: "img/16_final_triste.png",
    dialogos: [
        "Las dudas ganaron.",
        "Daniel se aleja.",
        "La oportunidad desaparece.",
        "Algunas historias terminan antes de empezar."
    ],
    opciones: [
        {
            texto: "🔄 Volver a jugar",
            siguiente: "portada"
        }
    ]
},

    finalAmigos: {
    imagen: "img/17_final_amigos.png",
    dialogos: [
        "\"Sigamos siendo amigos\".",
        "\"Me parece bien\".",
        "No hubo romance.",
        "Pero sí un vínculo sincero."
    ],
    opciones: [
        {
            texto: "🔄 Volver a jugar",
            siguiente: "portada"
        }
    ]
},

    finalChisme: {

    imagen: "img/18_final_chisme.png",

    dialogos: [
        "La historia recorrió toda la ciudad.",
        "Los rumores crecieron.",
        "La verdad llegó demasiado tarde.",
        "Te convertiste en la reina del cotilleo."
    ],

    opciones: [
        {
            texto: "🔄 Volver a jugar",
            siguiente: "portada"
        }
    ]
},

    reinaDrama: {
    imagen: "img/19_reina_del_drama.png",
    dialogos: [
        "Investigaste demasiado.",
        "Seguiste pistas inexistentes.",
        "Convertiste una confusión en una conspiración.",
        "🎭 Reina del Drama desbloqueada."
    ],
    opciones: [
        {
            texto: "🔄 Volver a jugar",
            siguiente: "portada"
        }
    ]
},

    tiempoAgotado: {
    imagen: "img/20_tiempo_agotado.png",
    dialogos: [
        "Los días pasaron.",
        "Nunca encontraste el momento adecuado.",
        "Daniel siguió adelante.",
        "El tiempo decidió por ti."
    ],
    opciones: [
        {
            texto: "🔄 Volver a jugar",
            siguiente: "portada"
        }
    ]
},
};

window.onload = () => {

    sceneImage.src =
        "img/01_menu_principal.png";

};
