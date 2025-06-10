#PROYECTO INTEGRADOR - Tecnicatura Superior en Ciencias de Datos e Inteligencia Artificial.: 

 <br />
    
# Integrantes

Allende Olmedo Nicolás - 35871057

<hr />

<h3 align="center">ABP- Entrega Final Proyecto Integrador</h3>

<h4><strong>DESCRIPCIÓN DEL REPOSITORIO</strong></h4>
<hr/>
<h3><strong> ABP Inegración de concepto aprendidos</strong></h3>

<p> En el Repositorio encontrará, lo correspondiente al cumplimiento del ABP, del espacio Curricular de Proyecto Integrador. En el mismo,se encuantra el Codigo Fuente de la app, desarrollada con React.js. Detro de este mismo README, dedescripciones paso a paso, de las intrucciones a seguir para poder ejecutrar la app.</p>

<h3>Instrucciones para ejecutar proyecto</h3>

<ul>
  <li> 1) Tener Instalado Visual Estudio Code o algun entorno de programación, que soporte Java Script y React Js</li>
  <li> 2) Tener Instalado Node.js - Pasos para instalarlo:
 Ingresar a 
https://nodejs.org/es/download
 Elegir la versión LTS Long-Term Support)
 Verificar instalación:
 node -v
 npm -v </li> 
  <li> 3) Crear en consola un "Nuevo proyecto en VITE" -  Pasos para crear el proyecto:
 -> Ejecutar en terminal:
 -npm create vite@latest
 -> Ingresar el nombre del proyecto
 -> Elegir 
-React
 -> Seleccionar 
-JavaScript  SWC
 Esto generará una estructura base para trabajar con React. </li>
  <li> 4) Tener instalado Tailwind, con VITE -  Seguir la guía oficial: 
https://tailwindcss.com/docs/installation/using-vit </li>
  <li> 5) Ejecutar los siguientes comando en una nueva terminal 
  -> cd mi-app 
 -> npm install
 -> npm run dev
 Acceder al proyecto en:
 http://localhost:5173 (URL por defecto generada por Vite) </li>
  <li> 6) Descargar el Proyecto de Git Hub ingresando al siguiente link <a href="https://github.com/AllendeNicolas/Proyecto-Integrador-ISPC-2025/tree/main/Evidencias"><strong>Ver Evidencias »</strong</a> </li>
  <li> 7) Ejecutar el Archivo en VS Code</li>
  <li> 8) En una nueva terminal, ejecutar los siguientes comandos: 1) cd "Evidencia uno proyecto integrador" - 2) npm run dev - 3) Acceder al proyecto en:
 http://localhost:5173 (URL por defecto generada por Vite) </li>
</ul>

<p><strong>NOTA IMPORTANTE: Al ejecutar el Host, y dirigirnos a la página en el navegador, "NO TRADUCIR LA PÁGINA A INGLES", para tener una experiencia fluida, esto se debe a que, los productos de la API, se encuentran en Inglés, y el buscador, solo filtra por el nombre original de los productos. Atentos con ese detalle, para que la App, funcione correctamente.</strong></p>

<h3>Estadísticas</h3>

<p>Se agregaron las siguientes estadísticas al proyecto: 
<ul>
 <li>Precio total de productos filtrados: Filtra los productos buscados y suma sus respectivos precios</li>
 <li>Productos totales: Muestra la cantidad de productos que hay disponibles en la App</li> 
 <li>Producto más caro: Muestra el valor del producto más caro y también de los productos buscados</li>
 <li>Producto más económico: Muestra el valor del producto más económico y también de los productos buscados</li>
 <li>Producto con más de 20 caracteres: Muestra aquellos productos, cuya cantidad de caracteres sea mayor a 20</li>
  <li>Promedio de Descuento: Muestra aquel promedio de descuento de precios de los productos</li>
  <li>Precio Promedio: Muestra aquel promedio del precio, de los productos</li>
</ul></p>

<p>Se agrgaron los graficos solicidatos, de Barra, Simulación de precios y Torta.</p>

<p>Se agrago la Paginacíon de productos a la págian principal</p>

<p>Se agrago los botones de descarga de JSON y EXCEL</p>






# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
