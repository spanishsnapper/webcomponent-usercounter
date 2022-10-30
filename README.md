# webcomponent-usercounter
Dynamic web component to show online users with icon, title and colour customisation


## Attributes:

 * **name** will set the title of the component
 * **color** will set the accent colour
 * **count** should be a positive integer in order for the counter animation to fire
 * **icon** should be the reference to an SVG file. In this code, located under src/img/icons. _(can be changed on line 72)_

## Usage

include the file to the head of your the document:

<code> <script src="{DOCUMENT_ROOT}/src/component/online-indicator.js" type="module"></script> </code>

Add the following HTML where you would like the component to render:


<code> \<online-indicator id="alumnocounter" name="Alumnos Conectados" color="\#F00" count="-" icon="alumno" > \</online-indicator> </code>


## Update counter
 
 Updating the counter attribute will cause the counter to animate from zero up to the new counter total. For example: 
 
 document.getElementById("connect_counter_alum").setAttribute("count", 5 );
