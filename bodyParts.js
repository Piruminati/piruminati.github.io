// ALT + Z = VER TODO EN LA MISMA LÍNEA

const bodyParts = {
    'gender' : ['m', 'f'], //male, female
    'body' : {
        'gen3' : {
            'm' : [],
            'f' : [],
        },
        'gen4' : {
            'm' : [],
            'f' : [],
        },
        'gen5' : {
            'm' : ['m_tono_1', 'm_tono_2', 'm_tono_3', 'm_tono_4'],
            'f' : ['f_tono_1', 'f_tono_2', 'f_tono_3', 'f_tono_4'],
        }
    },
    'hair' : {
        'gen3' : {
            'm' : [],
            'f' : [],
        },
        'gen4' : {
            'm' : [],
            'f' : [],
        },
        'gen5' : {
            'm' : ["1_azul", "1_blanco", "1_cyan", "1_gris", "1_marron", "1_naranja", "1_negro", "1_rojo", "1_rosa", "1_amarillo", "1_verde", "1_violeta", "2_azul", "2_blanco", "2_cyan", "2_gris", "2_marron", "2_naranja", "2_negro", "2_rojo", "2_rosa", "2_amarillo", "2_verde", "2_violeta", "3_azul", "3_blanco", "3_cyan", "3_gris", "3_marron", "3_naranja", "3_negro", "3_rojo", "3_rosa", "3_amarillo", "3_verde", "3_violeta","4_azul", "4_blanco", "4_cyan", "4_gris", "4_marron", "4_naranja", "4_negro", "4_rojo", "4_rosa", "4_amarillo", "4_verde", "4_violeta","5_azul", "5_blanco", "5_cyan", "5_gris", "5_marron", "5_naranja", "5_negro", "5_rojo", "5_rosa", "5_amarillo", "5_verde", "5_violeta", "6_azul", "6_blanco", "6_cyan", "6_gris", "6_marron", "6_naranja", "6_negro", "6_rojo", "6_rosa", "6_amarillo", "6_verde", "6_violeta","7_azul", "7_blanco", "7_cyan", "7_gris", "7_marron", "7_naranja", "7_negro", "7_rojo", "7_rosa", "7_amarillo", "7_verde", "7_violeta", "8_azul", "8_blanco", "8_cyan", "8_gris", "8_marron", "8_naranja", "8_negro", "8_rojo", "8_rosa", "8_amarillo", "8_verde", "8_violeta", "9_azul", "9_blanco", "9_cyan", "9_gris", "9_marron", "9_naranja", "9_negro", "9_rojo", "9_rosa", "9_amarillo", "9_verde", "9_violeta", "10_azul", "10_blanco", "10_cyan", "10_gris", "10_marron", "10_naranja", "10_negro", "10_rojo", "10_rosa", "10_amarillo", "10_verde", "10_violeta","11_azul", "11_blanco", "11_cyan", "11_gris", "11_marron", "11_naranja", "11_negro", "11_rojo", "11_rosa", "11_amarillo", "11_verde", "11_violeta", "15_rocket_1", "15_rocket_2", "16_ash_1", "16_ash_2", "16_ash_3","17_ranger_1", "17_ranger_2", "18_maximo_1", "18_maximo_2", "18_maximo_3", "19_gorra_1","19_gorra_2","19_gorra_3","19_gorra_4","19_gorra_5","19_gorra_6", "20_brendan_1","20_brendan_2","20_brendan_3", "21_marron", "21_blanco", "21_morado", "21_azul", "21_naranja", "22_amarillo", "22_azul", "22_gris", "22_marron", "22_rojo", "22_rosa", "22_violeta", "22_verde", "22_naranja", "22_negro", "22_blanco"],
            'f' : ["99_azul", "99_blanco", "99_cyan", "99_gris", "99_marron", "99_naranja", "99_negro", "99_rojo", "99_rosa", "99_amarillo", "99_verde", "99_violeta","98_azul", "98_blanco", "98_cyan", "98_gris", "98_marron", "98_naranja", "98_negro", "98_rojo", "98_rosa", "98_amarillo", "98_verde", "98_violeta","97_azul", "97_blanco", "97_cyan", "97_gris", "97_marron", "97_naranja", "97_negro", "97_rojo", "97_rosa", "97_amarillo", "97_verde", "97_violeta"],
        }
    },
    'shirt' : {
        'gen3' : {
            'm' : [],
            'f' : [],
        },
        'gen4' : {
            'm' : [],
            'f' : [],
        },
        'gen5' : {
            'm' : ["1_amarillo", "1_azul", "1_blanco", "1_cyan", "1_gris", "1_marron", "1_naranja", "1_negro", "1_rojo", "1_rosa", "1_verde", "1_violeta","2_azul", "2_blanco", "2_cyan", "2_marron", "2_naranja", "2_negro", "2_rojo", "2_amarillo", "2_verde", "2_violeta", "3_azul", "3_cyan", "3_marron", "3_naranja", "3_rojo", "3_verde", "3_violeta","4_azul", "4_blanco", "4_cyan", "4_gris", "4_marron", "4_naranja", "4_negro", "4_rojo", "4_rosa", "4_amarillo", "4_verde", "4_violeta","5_azul", "5_blanco", "5_gris", "5_naranja", "5_negro", "5_rojo", "5_rosa", "5_amarillo", "5_verde", "5_violeta", "6_verde", "6_violeta", "6_negro", "6_azul", "6_blanco" , "6_naranja"],
            'f' : ["99_azul", "99_blanco", "99_cyan", "99_gris", "99_marron", "99_naranja", "99_negro", "99_rojo", "99_rosa", "99_amarillo", "99_verde", "99_violeta"],
        }
    },
    'pants' : {
        'gen3' : {
            'm' : [],
            'f' : [],
        },
        'gen4' : {
            'm' : [],
            'f' : [],
        },
        'gen5' : {
            'm' : ["1_amarillo", "1_azul", "1_blanco", "1_cyan", "1_gris", "1_marron", "1_naranja", "1_negro", "1_rojo", "1_rosa", "1_verde", "1_violeta", "2_azul", "2_blanco", "2_cyan", "2_gris", "2_marron", "2_naranja", "2_negro", "2_rojo", "2_rosa", "2_amarillo", "2_verde", "2_violeta",],
            'f' : ["99_azul", "99_blanco", "99_cyan", "99_gris", "99_marron", "99_naranja", "99_negro", "99_rojo", "99_rosa", "99_amarillo", "99_verde", "99_violeta"],
        }
    },
    'shoes' : {
        'gen3' : {
            'm' : [],
            'f' : [],
        },
        'gen4' : {
            'm' : [],
            'f' : [],
        },
        'gen5' : {
            'm' : ["1_azul", "1_blanco", "1_cyan", "1_gris", "1_marron", "1_naranja", "1_negro", "1_rojo", "1_rosa", "1_amarillo", "1_verde", "1_violeta"],
            'f' : ["99_azul", "99_blanco", "99_cyan", "99_gris", "99_marron", "99_naranja", "99_negro", "99_rojo", "99_rosa", "99_amarillo", "99_verde", "99_violeta"],
        }
    },
};

export { bodyParts }