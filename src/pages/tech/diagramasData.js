/**
 * Catálogo de slugs para los tipos de diagrama disponibles.
 * Usado por la página índice para renderizar las cards.
 */
export const diagramaSlugs = [
  { slug: 'clases',                  label: 'Diagrama de Clases' },
  { slug: 'casos-uso',               label: 'Casos de Uso' },
  { slug: 'actividades',             label: 'Diagrama de Actividades' },
  { slug: 'modelo-entidad-relacion', label: 'Modelo Entidad Relación' },
]

/**
 * Descripciones cortas para cada tipo, mostradas en las cards del índice.
 */
export const descripcionPorSlug = {
  clases:
    'Representa la estructura estática del sistema mostrando clases, atributos, ' +
    'métodos y relaciones entre objetos del modelo de datos.',
  'casos-uso':
    'Describe las interacciones entre los actores externos y el sistema, ' +
    'identificando los casos de uso principales de cada módulo.',
  actividades:
    'Modela el flujo de trabajo y procesos del negocio mediante diagramas de ' +
    'actividad UML que describen la secuencia de acciones del sistema.',
  'modelo-entidad-relacion':
    'Muestra la estructura lógica de la base de datos con entidades, atributos ' +
    'y relaciones entre las tablas del sistema.',
}

/**
 * Textos de introducción para la página de detalle de cada diagrama.
 * Se muestran antes de los módulos obtenidos desde la API.
 */
export const introducciones = {
  clases:
    'El diagrama de clases del sistema Onal&Nel representa la estructura estática ' +
    'del modelo de datos, mostrando las entidades principales del sistema como ' +
    'clases con sus atributos, métodos y las relaciones de asociación, herencia ' +
    'y dependencia entre ellas. Este diagrama sirve como base para la implementación ' +
    'del modelo de datos en la base de datos MySQL y la lógica de negocio en el backend.',
  'casos-uso':
    'Los diagramas de casos de uso describen las interacciones entre los actores ' +
    'externos (usuarios, clientes, administradores) y el sistema Onal&Nel. Cada ' +
    'caso de uso representa una funcionalidad específica que el sistema debe ' +
    'proporcionar, mostrando los límites del sistema y las relaciones entre los ' +
    'diferentes casos de uso.',
  actividades:
    'El diagrama de actividades modela el flujo de trabajo y los procesos del ' +
    'negocio dentro del sistema Onal&Nel. Muestra la secuencia de acciones, ' +
    'decisiones y flujos paralelos que ocurren durante la ejecución de un proceso, ' +
    'permitiendo visualizar el comportamiento dinámico del sistema.',
  'modelo-entidad-relacion':
    'El modelo entidad-relación (MER) representa la estructura lógica de la base ' +
    'de datos del sistema Onal&Nel. Este diagrama muestra las entidades principales ' +
    'del sistema, sus atributos y las relaciones entre ellas, proporcionando una ' +
    'visión general de cómo se organiza y almacena la información en la base de ' +
    'datos MySQL.',
}
