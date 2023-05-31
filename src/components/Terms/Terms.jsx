import React, { useState } from "react";
import style from "../Terms/Terms.module.css"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import { MenuItem, toggleButtonClasses } from "@mui/material";
import Select from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
import { InputLabel } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { register as registerUser } from "../../redux/AuthActions";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
function Terms({ handlerOpenPayment, handlerOpenLogin , OpenLogin, setOpenTerms}) {

  const {error} = useSelector(state=>state.auth)

  const [Distrito, setDistrito] = useState(false);
  const [seePassword, setseePassword] = useState(false);

  const { distrits } = useSelector((state) => state.schools);
  const dispatch = useDispatch();

  const ToggleSeePass = () => {
    setseePassword(!seePassword);
  };

  const handleValueDistrito = (event) => {

    setDistrito(event.target.value);
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      mail: "",
      ruc: "",
      lastname: "",
      phone: "",

      schoolName: "",
      password: "",
      esColegio: true,
    },
    mode: "onChange",
  });
  const navigate = useNavigate();
  const handlerLogin = () => {
    handlerOpenLogin(true);
    handlerOpenLogin(!OpenLogin)
  };
  const OnSubmit = (user) => {
    const data = {
      esColegio: true,
      apellidos: user.lastname,
      email: user.mail,
      nombre: user.name,
      password: user.password,
      telefono: user.phone,
      ruc: user.ruc,

      nombre_colegio: user.schoolName,
      DistritoId: Distrito,
    };

    dispatch(registerUser(data));
  };

  return (
    <>
      <div className={style.h1_div}>
        <h1 className="text-[1.8vh] p-2">Términos y Condiciones de uso</h1>
      </div>
      <div  >
       
       <p className={style.divp} >Condiciones generales del servicio de MICOLE.PE, S.L.
1. Objeto
Las presentes Condiciones Generales tienen por objeto establecer las disposiciones que regulan el acceso, utilización y contratación de los servicios de consultoría en el ámbito de la educación en España ofertados a través del Sitio Web www.micole.pe (en adelante, el “Sitio Web”), gestionado por MICOLE.PE, S.L. (en adelante, “MICOLE.PE” o “nosotros”).
La prestación de los Servicios que se ofrecen a través del Sitio Web requiere que aceptes las presentes Condiciones Generales, instrumento jurídico que regula, junto a la Política de Privacidad y Cookies, la totalidad de las relaciones jurídicas que te unen con MICOLE.PE. Mediante la aceptación de estas Condiciones Generales, reconoces tener la capacidad jurídica exigida por el ordenamiento jurídico peruano para poder realizar actos de contratación. Especialmente, ser mayor de 18 años. En el caso de que seas menor de 18 años, deberás obtener el consentimiento de tus padres o tutores para poder utilizar los Servicios.
Estas Condiciones Generales permanecerán en todo momento a tu disposición en el Sitio Web. En el caso de que alguna de sus cláusulas sea declarada nula, se eliminará de forma automática, pero el resto de cláusulas conservarán su plena validez y eficacia jurídica.
MICOLE.PE podrá introducir modificaciones pertinentes en parte o en la totalidad de los Servicios o en las Condiciones Generales, comprometiéndose a informarte de tales modificaciones con, al menos, una semana de antelación. Se entenderá que otorgas tu consentimiento a tal actualización si continúas utilizando los Servicios ofertados a través del Sitio Web. En caso de que no estés de acuerdo con las actualizaciones realizadas, podrás renunciar dejando de usar los Servicios.
2. Información sobre el titular
El titular del Sitio Web es MICOLE.PE, S.L. (en adelante, "MICOLE.PE" o "nosotros"), con "" y domicilio social en " ". MICOLE.PE está inscrita en el Registro "". Puedes contactar con nosotros a través de la dirección de correo electrónico [](mailto:;) o llamándonos al +.
A través del Sitio Web, MICOLE.PE tiene por objeto proporcionar al Usuario información fiable y actualizada, así como distintas recomendaciones sobre los centros educativos existentes en España, ya sean públicos, concertados o privados, en función de los criterios de selección previamente indicados por el Usuario al completar el formulario del Sitio Web.
Asimismo, MICOLE.PE facilita a los Usuarios la información de contacto de los centros educativos previamente seleccionados y permite la reserva de citas previa con el centro educativo en cuestión para su visita, sin coste alguno para el Usuario.
Por otra parte, MICOLE.PE facilita a los centros educativos la información obtenida de los Usuarios durante su utilización del Sitio Web.
Queda al arbitrio de MICOLE.PE y a su exclusivo criterio comercial ampliar, reducir o suprimir los servicios ofertados a través del Sitio Web.
3. Sujetos
MICOLE.PE es el titular del Sitio Web. También se hace referencia a MICOLE.PE cuando se utiliza el término “nosotros” o cuando se utilizan tiempos verbales en primera persona del plural.
“Usuario”. Se refiere a cualquier persona que utiliza MICOLE.PE a través del Sitio Web u otros canales offline y online. Cuando en estas Condiciones Generales utilizamos los términos “ti”, “tu”, “tú”, “te”, también nos referimos al Usuario.
“Centros” son los centros educativos recogidos en nuestra plataforma y sobre los que MICOLE.PE ha recopilado información para establecer los grados de afinidad con los “Usuarios”.
4. Descripción del servicio
A través del Sitio Web se ofrece un conjunto de servicios de análisis, consultoría y recomendación de centros educativos (en adelante: individualmente, el “Servicio”; conjuntamente, los “Servicios”), poniendo a disposición del Usuario una información fiable y actualizada sobre determinados centros educativos, en función de los criterios de selección previamente introducidos en el Sitio Web.
La prestación de los Servicios se regula a través de las presentes Condiciones Generales.
4.1 Funcionamiento y acceso
Una vez el Usuario accede al sitio Web, tiene a disposición el Test de Micole, donde tras introducir sus preferencias y características personales se procederá a recomendar una serie de centros en función de su grado de afinidad. De igual forma podrá hacer uso de las funcionalidades de buscador, rankings, contacto directo con centros educativos, etc.
Igualmente, el Usuario podrá encontrar información y recomendaciones relacionadas con la familia y la educación en nuestro Sitio Web, Blog y otros canales online y offline.
Una vez que el usuario contacta con un centro educativo, MICOLE.PE le enviará una notificación al centro educativo para que revise la consulta dentro de su área privada y pueda darle respuesta (según el nivel de relación del centro educativo con MICOLE.PE algunos datos no serán compartidos). Además de notificar al centro educativo, MICOLE.PE enviará al usuario los datos de contacto del centro educativo para que se pueda poner en contacto directamente con el centro.
4.2 Disponibilidad del Servicio
Los Servicios serán implementados por zonas geográficas.
4.3 Canal de resolución de incidencias
Puedes notificar cualquier incidencia relativa al funcionamiento del Servicio a través de la dirección de correo electrónico info@micole.net.
5. Condiciones del servicio
Al utilizar el Servicio, el Usuario acepta que MICOLE.PE le recomiende los Centros educativos con los que ha obtenido mayor afinidad y que informe a estos de dicha afinidad, compartiendo la información suficiente para la actividad comercial de los Centros y de terceros con los que MICOLE.PE mantenga una relación contractual.
Al confirmar la dirección de correo electrónico del usuario, MICOLE.PE le creará una cuenta de usuario desde la que este podrá consultar las acciones llevadas a cabo dentro de la plataforma y realizar nuevas de forma más eficiente.
Los datos compartidos con MICOLE.PE podrán ser compartidos con Centros Educativos y/o otros socios con los que MICOLE.PE mantiene relaciones comerciales con el fin de que estos puedan realizar acciones comerciales.
Los Centros deben respetar los valores de rigurosidad y buenas prácticas que MICOLE.PE defiende, pudiendo ser excluidos de la plataforma en caso de no respetarlos.
6. Contraprestaciones y medios de pago
El uso de algunos servicios ofrecidos por MICOLE.PE (test de afinidad, buscador, etc.) es gratuito para los Usuarios y el de otros es de pago (ejemplo: asesoramiento personalizado).
MICOLE.PE entablará relaciones comerciales con los Centros para poder hacerles llegar la información de los Usuarios más afines a ellos así como información de inteligencia de mercado y otros servicios de consultoría en materia de educación.
La forma, periodicidad y cuantía del pago por la prestación de los servicios que MICOLE.PE ofrece a los Centros Educativos vendrán determinados en cada uno de los acuerdos individuales firmados entre estos y MICOLE.PE.
MICOLE.PE puede participar en diversos programas de afiliación diseñados para ofrecer un modo de obtener comisiones por publicidad, publicitando e incluyendo enlaces a productos o servicios de terceros.
7. Obligaciones de los usuarios del servicio
Como Usuario del Servicio, te comprometes a cumplir con las siguientes condiciones y obligaciones:
Proporcionar información actual, exacta y veraz, así como informar de las modificaciones que se pudieran producir en los datos personales que conforman tu perfil de Usuario. 
Custodiar las claves de acceso a la plataforma con diligencia y no ceder ni permitir su uso a terceros, en atención a su carácter personal e intransferible. 
Abstenerte de realizar cualquier acto considerado lesivo de los derechos e intereses de MICOLE.PE y, en particular, abstenerte de realizar cualquier acto que pueda ser considerado una vulneración de los derechos de propiedad intelectual e industrial titularidad de MICOLE.PE o de terceros. En el caso de que cometas cualquier acto que lesione los derechos e intereses de MICOLE.PE, deberás indemnizarnos por los daños y perjuicios causados. 
Abstenerte de introducir en el Sitio Web cualquier software, malware, virus o troyano que pudiera causar daños o alteraciones en el funcionamiento de los mismos y/o en el Servicio. 
Abstenerte de usar el Sitio Web para enviar spam u otras comunicaciones no deseadas. 
Abstenerse de llevar a cabo cualquier otra conducta que pueda resultar lesiva para los intereses de MICOLE.PE o que sea contraria a la ley, la moral o el orden público. 
8. Responsabilidad
MICOLE.PE no responderá por las recomendaciones finales dadas al Usuario ni de la información y/o recomendaciones facilitada por los centros educativos reservados a través del Sitio Web, aunque podrás transmitirnos cualquier incidencia a través del canal descrito en el apartado 4.3 de estas Condiciones Generales.
Asimismo, MICOLE.PE tampoco será responsable en modo alguno por las siguientes cuestiones, que se enumeran a título ejemplificativo pero no exhaustivo:
Utilizaciones del Servicio que sean contrarias a las presentes Condiciones y Términos de Uso, así como aquellas utilizaciones fraudulentas, inadecuadas o contrarias a Derecho. 
Alteraciones o interrupciones temporales del Servicio producidas por fallos en la red, en el servidor o en cualquier recurso tecnológico que impida la continuidad del Servicio. Sin embargo, cuando se produzcan tales alteraciones, MICOLE.PE se compromete a resolver la incidencia lo antes posible. De esta forma, MICOLE.PE hará todo lo razonablemente posible para mantener operativo el Sitio Web, pero no será en ningún caso responsable de las incidencias registradas a tal efecto. 
Acceso no autorizado de terceros a la plataforma, causada bien por una falta en el deber de custodia de las claves de acceso por parte del Usuario o bien por la vulneración de las medidas de seguridad dispuestas por MICOLE.PE. 
El acceso al Sitio Web y los riesgos derivados de su utilización son responsabilidad exclusiva del Usuario. MICOLE.PE no garantiza la continuidad en la disponibilidad del Sitio Web, su seguridad o la inexistencia de anomalías. De conformidad con el artículo 17 de la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y de comercio electrónico; MICOLE.PE no responde de los contenidos incluidos en los sitios web a los que facilita enlaces ni conoce sus condiciones de uso, por lo que el acceso a los mismos que realices se produce bajo tu exclusiva responsabilidad. La inclusión de tales enlaces tampoco puede entenderse como una sugerencia, recomendación o promoción de los sitios web enlazados, ni implica que exista relación alguna entre MICOLE.PE y los titulares de tales sitios web. Si consideras que alguno de los contenidos incluidos en el Sitio Web o en los sitios web enlazados son inadecuados o contrarios a derechos o intereses de terceros, puedes comunicárnoslo a través de la dirección de correo electrónico [info@micole.net](mailto:info@micole.net;) o el teléfono +34 686090966. 
9. Propiedad intelectual e industrial
Los activos intangibles incluidos o relacionados con el Sitio Web se encuentran protegidos por los regímenes de propiedad intelectual o industrial, y son titularidad de MICOLE.PE o de terceros.
Todos los nombres de dominio, marcas, signos distintivos y logos que aparecen en el Sitio Web son propiedad de MICOLE.PE o de terceros y no podrán ser objeto de explotación sin la autorización expresa del titular.
Asimismo, todos los contenidos, entre los que se incluyen a título ejemplificativo los textos, vídeos, elementos gráficos, infografías, imágenes y diseño del Sitio Web, así como el software en sus versiones de código fuente y código objeto son propiedad exclusiva de MICOLE.PE o de terceros, por lo que ningún Usuario está autorizado para realizar acto de explotación alguno sobre ellos diferentes a los expresamente indicados en este apartado.
La contratación de cualquiera de los Servicios no supone una transmisión de derechos de propiedad intelectual o industrial a tu favor, sino únicamente la concesión de un derecho de uso y visualización limitado al contexto de la utilización del Sitio Web.
Queda prohibido cualquier uso comercial, reventa, distribución, modificación o comercialización bajo cualquier forma de cualesquiera contenidos incluidos en el Sitio Web, o del software, sin autorización previa y expresa de MICOLE.PE.
En caso del uso de los contenidos por parte de medios de comunicación, sin uso comercial, este deberá incluir una referencia al Sitio Web www.micole.net y, en el caso de publicaciones digitales, deberá incluir un enlace al mismo.
10. Duración y terminación
La continuidad y disponibilidad del Sitio Web se prolonga de forma indefinida.
MICOLE.PE se reserva la posibilidad de suspender temporalmente o terminar de forma definitiva la prestación de los Servicios o el acceso a los mismos a través del Sitio Web en cualquier momento, de lo cual te advertiríamos con un periodo mínimo de antelación de 15 días.
MICOLE.PE podrá extinguir, en cualquier momento y sin preaviso, su relación jurídica contigo en el caso de que incumplas alguna de las disposiciones previstas en estas Condiciones Generales, sin perjuicio de que MICOLE.PE pueda ejercitar las acciones civiles o penales correspondientes.
11. Normativa y jurisdicción
Las presentes Condiciones Generales se rigen en todos y cada uno de sus extremos por la ley española. El idioma de redacción e interpretación de este documento es el español. Este documento no se archivará individualmente para cada Usuario, sino que permanecerá accesible por medio de Internet en este mismo Sitio Web.
Las partes acuerdan someterse a los Juzgados y Tribunales de "" que por las normas de reparto procesal resulten competentes.
De conformidad con el Reglamento "", le informamos de que puede acceder al Sitio Web de resolución de conflictos en línea de la ""



Politica de privacidad


Política de privacidad y protección de datos
MICOLE.PE, S.L., (en adelante "MICOLE.PE"), conforme a la legislación vigente en materia de Protección de Datos de Carácter Personal, informa a los Usuarios de su plataforma, acerca de la Política de Privacidad y Protección de Datos que aplicará en el tratamiento de los datos personales que el Usuario facilite voluntariamente al acceder al Sitio www.micole.net o a los diferente canales online y offline propiedad de MICOLE.PE.
El Usuario, al proporcionar a MICOLE.PE sus datos de carácter personal a través de los formularios electrónicos de la Web, consiente expresamente que MICOLE.PE pueda tratar esos datos en los términos de esta cláusula de Política de Privacidad y Protección de Datos y para los fines aquí expresados.
Antes de registrarse en MICOLE.PE, los Usuarios deben leer la presente Política de Privacidad y Protección de Datos. Al marcar el botón “Acepto las Políticas de Privacidad, Cookies y Condiciones Generales del Servicio”, los Usuarios afirman que han leído y que consienten expresamente las presente Política de Privacidad de Datos.
Al interactuar en la plataforma, los Usuarios proporcionarán la siguiente información para poder ofrecerles los diferentes servicios de MICOLE.PE: nombre, apellidos, correo electrónico, Teléfono móvil, número de hijos, edad de los hijos, sexo de los hijos y cualquier otro dato que permita hacer una recomendación óptima en función de las características del Usuario.
El Usuario se compromete a introducir datos reales y veraces. Asimismo, será el único responsable de los daños y perjuicios que MICOLE.PE pudiera sufrir como consecuencia de la falta de veracidad, inexactitud, falta de vigencia y autenticidad de los datos facilitados.
Los datos recabados por MICOLE.PE serán exclusivamente utilizados para la consecución del objeto definido en las Condiciones Generales de Uso de la Web que pueden ser consultadas en la web www.micole.pe y cuyos fines más destacables son la recomendación de los Centros Educativos con los que el Usuario tiene una mayor afinidad y la notificación a estos de dicha recomendación, compartiendo además la información del Usuario con dichos Centros; así como el envío de comunicaciones comerciales de MICOLE.PE y de terceros.
Información básica sobre protección de datos
Identidad: MICOLE.PE, S.L. 
Finalidad: Gestión y prestación de servicios solicitados. 
Legitimación: Cumplimiento de la relación contractual, interés legítimo y consentimiento del Usuario. 
Derechos: Acceso, rectificación, supresión y portabilidad de sus datos y limitación u oposición a su tratamiento o retirar el consentimiento prestado. 
Información adicional: Puede consultar la información adicional y detallada sobre protección de datos en los apartados siguientes. 
1. RESPONSABLE DEL TRATAMIENTO
Toda la información personal que facilite o se recoja a través de www.micole.net y los canales offline y online de MICOLE.PE, será tratada por MICOLE.PE como responsable del tratamiento, mostrándose a continuación sus datos de contacto.
Responsable del tratamiento de sus datos
Identidad: MICOLE.PE, S.L.
Dirección postal: " "
Teléfono: ""
Correo electrónico:  
2. INFORMACIÓN QUE RECOPILA MICOLE.PE
La Plataforma de MICOLE.PE recopila información del Usuario que éste aporta.
Datos de Usuario: la información que el Usuario nos facilita cuando utiliza o se crea una cuenta en la Plataforma de MICOLE.PE: nombre, apellidos, correo electrónico, Teléfono móvil, número de hijos, edad de los hijos, sexo de los hijos y cualquier otro dato que permita hacer una recomendación óptima en función de las características del Usuario. 
Información del Perfil del Usuario: la información que el Usuario añade en la Plataforma a efectos de poder utilizar el servicio de MICOLE.PE, 
Información adicional que el Usuario quiere compartir: la información que podría facilitar el Usuario a MICOLE.PE con otros fines. 
Información recogida automáticamente, utilizando cookies y otras tecnologías de seguimiento. También podemos recoger información sobre el dispositivo que utilice para acceder a nuestros Sitios Web, su dirección IP (lo que nos da acceso a ver su ubicación geográfica),cuando quiera utilizar el buscador de colegios o la opción de ¨cerca de mí ¨. Siendo la base de legitimación el consentimiento otorgado expresamente en el momento de aceptar que ha entendido que es necesario conocer su localización. 
En el caso de compras realizadas en la plataforma o cualquiera de los canales online u offline de MICOLE.PE: 
Trataremos sus datos personales cuando rellene el formulario de compra para gestionar el pedido, las reclamaciones y/o devoluciones, emitir la factura, así como para cumplir con las obligaciones adminsitrativas, contables y fiscales. Los datos personales que trataremos son los identificativos, domicilio y bancarios. Siendo la base legal del tratamiento de sus datos por ser necesarios para la ejecucion del contrato existente en el momento de comprar. 
En relación con sus datos bancarios o información acerca de sus tarjetas de crédito, informarle que no tendremos registro alguno en nuestra base de datos, dado que nuestro proveedor de servicios financieros externo (Stripe), será quien procese toda la información de los mismos así como las transmisiones o transferencias de dichos datos, con la protección SSL, lo que implica que todas las operaciones y transacciones se realizan en un servidor seguro cuyo acceso está restringido a ciertos usuarios, y que toda la información intercambiada es encriptada, lo que permite asegurar la autenticidad del Sitio Web desde donde se recaban los Datos Personales, así como la integridad y confidencialidad de los Datos Personales durante su transmisión. 
Menores: MICOLE.PE no recabará, ni tratará datos personales de menores de catorce años (14 años), sin consentimiento del padre, madre o tutor legal, por lo que suprimiremos cualquier dato personal introducido por un menor que no cumpla con esta condición. Por tanto, absténgase de facilitarlos si no tiene esa edad o, en su caso, de facilitar datos de terceros que no tengan la citada edad. En este sentido, MICOLE.PE anima a los padres a que supervisen las actividades electrónicas de sus hijos, eximiéndose de cualquier responsabilidad por el incumplimiento de lo indicado. 
También tratamos sus datos personales cuando acepta que sus comentarios sean publicados en la web/blog, siendo la base legal el consentimiento otorgado expresamente en el momento de clicar que acepta publicar su comentario. 
Todo el contenido publicado por los centros (que puede incluir, de forma no exhaustiva, descripciones, información cuantitativa, fotografías, vídeos y cualquier otra información sobre el centro educativo) en su ficha de Micole será responsabilidad única del centro, aceptando este todas las reclamaciones que dicho contenido pudiese ocasionar y aceptando expresamente mantener indemne a Micole ante cualquier reclamación de terceros. Además, cada suscriptor (de pago o gratuito) de Micole tiene la obligación de velar por que la información que figura en su perfil de Micole es cierta y no lleva a posible engaño o confusión, siendo de nuevo el centro el único responsable sobre dicho contenido. Al subir contenido a su ficha, el centro autoriza a que Micole utilice dicho contenido tanto en la plataforma como en el resto de canales online y offline (redes sociales, prensa, mailing, etc.). 
El tratamiento de estos datos por parte de MICOLE.PE es necesario para poder cumplir con la relación contractual que se establece. Si el Usuario no los facilita, los servicios solicitados podrán no estar disponibles y MICOLE.PE podrá no prestarlos.
3. FINALIDAD Y LEGITIMACIÓN DEL TRATAMIENTO
MICOLE.PE utiliza los datos que recopila de los Usuarios para que puedan acceder y comunicarse con la plataforma de MICOLE.PE y para prestar los servicios que soliciten a través de su cuenta en la Plataforma MICOLE.PE, según el mecanismo descrito en las “Condiciones Generales”. 
MICOLE.PE podrá ceder los datos de Usuarios a Centros Educativos y/o otras entidades con los que mantenga una relación comercial para que estos puedan iniciar actividades comerciales. 
MICOLE.PE también utiliza la información para investigar y analizar cómo mejorar los servicios que presta a los Usuarios, así como para desarrollar y mejorar las características de los servicios que ofrece. 
Internamente, MICOLE.PE utiliza la información con fines estadísticos a efectos de analizar el comportamiento y las tendencias de los Usuarios, de comprender cómo los Usuarios utilizan la Plataforma de MICOLE.PE, y de gestionar y mejorar los servicios ofrecidos. 
Asimismo, MICOLE.PE podrá utilizar los datos personales que el Usuario le facilita para realizar comunicaciones via correo electrónico y/o enviar SMS al Usuario acerca del servicio. Al utilizar o registrarse en la Plataforma se entenderá que el Usuario acepta la presente Política de Privacidad y que, por lo tanto, autoriza a MICOLE.PE para realizar ambas comunicaciones. 
Por otro lado, MICOLE.PE, con el consentimiento del Usuario, podrá enviar al correo electrónico de los Usuarios mensajes promocionales, noticias, acciones y/o newsletters relativas a los servicios que ofrece. Si el Usuario de MICOLE.PE desea no recibir la citada información y/o comunicaciones comerciales, podrá optar en cualquier momento darse de baja en el propio correo electrónico o escribiendo a info@micole.net, y consecuentemente, MICOLE.PE cesará inmediatamente en el envío de la citada información. 
Si el Usuario conecta su cuenta de MICOLE.PE a otra red social o a la plataforma de un tercero, MICOLE.PE podría utilizar la información cedida a esa red social o tercero, siempre que dicha información se haya puesto a disposición de MICOLE.PE cumpliendo con la política de privacidad de dicha red social o plataforma de tercero. 
MICOLE.PE no utiliza la información de los Usuarios para ningún otro fin que los descritos en la presente Política de Privacidad y las Condiciones de uso. 
MICOLE.PE está legitimada a tratar los datos de los Usuarios con las finalidades anteriormente mencionadas, tal y como está expresamente reconocido por la legislación vigente, (i) en caso de que el Usuario haya prestado su consentimiento y/o (ii) en caso de que la información enviada sea relativa a productos y servicios similares a los que fueron objeto de una venta previa o negociación, siempre que el Usuario no hubiera optado por dejar de recibir dichas comunicaciones. 
En cuanto a la transferencia internacional de datos, MICOLE.PE no realizará ninguna Transferencia Internacional de datos pero en el caso de que algunos de los proveedores de MICOLE.PE necesarios para el cumplimiento, control y gestión de la relación existente con Usted respecto del servicio contratado, estén ubicados en territorios situados fuera del Perú, MICOLE.PE adoptará las garantías adecuadas y siempre guardando la integridad y confidencialidad de sus datos. 
4. CESIONES A TERCEROS DE DATOS DE CARÁCTER PERSONAL
El Usuario consiente expresamente la cesión de sus datos a los destinatarios que se indican a continuación, por los motivos que a continuación se explican:
Administraciones Públicas: para el cumplimiento de las obligaciones legales a las que MICOLE.PE está sujeta por su actividad. 
Proveedores que precisen acceder a sus datos para la prestación de servicios que MICOLE.PE haya contratado a dichos proveedores, y con los cuales MICOLE.PE tiene suscritos los contratos de confidencialidad y de tratamiento de datos personales necesarios y exigidos por la normativa para proteger su privacidad. 
Centros Educativos. 
Entidades con las que MICOLE.PE mantenga una relación comercial. 
Si en el futuro MICOLE.PE realizara otras cesiones de datos personales, siempre con arreglo a las cesiones legalmente permitidas, informará oportunamente a los Usuarios.
5. PERIODO DE CONSERVACIÓN
Los datos del Usuario se conservarán mientras se mantenga su relación con MICOLE.PE y, tras la finalización de dicha relación por cualquier causa, durante los plazos de prescripción legales que sean de aplicación con relación a las finalidades legítimas de tratamiento de sus datos personales.
Tras la finalización de la relación los datos personales serán tratados a los solos efectos de acreditar el cumplimiento de nuestras obligaciones legales o contractuales.
Cuando el Usuario solicite la baja del servicio, MICOLE.PE cursará la misma eliminando los datos identificativos del usuario.
6. DERECHOS DEL INTERESADO Y RECLAMACIONES
El Usuario puede ejercitar sus derechos de acceso, rectificación, supresión, portabilidad, limitación y/u oposición al tratamiento. Estos derechos pueden hacerse efectivos a través de nuestro correo electrónico:"", indicando el asunto de referencia.
Si considera que el tratamiento de sus datos personales vulnera la normativa o sus derechos, puede presentar una reclamación ante MICOLE.PE, S.L. 
El ejercicio de estos derechos deberá realizarse por escrito firmado por el titular de los datos, con indicación de su domicilio, adjuntando copia de su Documento Nacional de Identidad u otro documento acreditativo.
7. CÓMO PROTEGEMOS LOS DATOS DE LOS USUARIOS
MICOLE.PE pone en conocimiento de los Usuarios que ha adoptado las medidas de garantizan la seguridad de los datos de carácter personal y evitan su alteración, pérdida, tratamiento o acceso no autorizado, habida cuenta del estado de la tecnología, la naturaleza de los datos almacenados y los riesgos a que estén expuestos.
8. COOKIES E IPS
El Usuario acepta el uso de cookies y seguimientos de IPs, para brindarte información más personalizada a tu punto de conexión. Se tratan de datos estadísticos sobre las acciones y patrones de navegación de nuestros usuarios, y no identifican a ninguna persona.
9. NOTIFICACIONES Y MODIFICACIONES
Como se ha indicado anteriormente, todos los Usuarios tienen derecho a acceder, actualizar y cancelar sus datos, así como oponerse a su relación con la Política de Privacidad de MICOLE.PE a través del correo electrónico "".
A causa de la contínua evolución de las actividades de MICOLE.PE, la presente Política de Privacidad, la Política de Cookies y las Condiciones Generales podrán igualmente modificarse. MICOLE.PE enviará al Usuario los avisos sobre los cambios y modificaciones sustanciales de dichos documentos a través del correo electrónico, o de otro medio que asegure la recepción de los mismos. De todas formas, MICOLE.PE en ningún caso modificará las políticas ni prácticas para hacerlas menos eficaces en la protección de los datos personales de nuestros clientes almacenados anteriormente.

</p>
       
      </div>
      

    
    </>
  );
}

export default Terms;