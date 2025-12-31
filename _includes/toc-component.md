<div id="toc" markdown="1" popover>

{% include toc.md %}
</div>

<div id="font-options" popover>
   <label>
      <span>Tamaño de fuente en los versículos:</span>
      <select id="font-size-select">
         <option value="100%">100%</option>
         <option value="105%">105%</option>
         <option value="110%">110%</option>
         <option value="115%">115%</option>
         <option value="120%">120%</option>
      </select>
   </label>
</div>

<button popovertarget="toc" title="Tabla de contenido" markdown="span"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M120-280v-80h560v80H120Zm0-160v-80h560v80H120Zm0-160v-80h560v80H120Zm680 320q-17 0-28.5-11.5T760-320q0-17 11.5-28.5T800-360q17 0 28.5 11.5T840-320q0 17-11.5 28.5T800-280Zm0-160q-17 0-28.5-11.5T760-480q0-17 11.5-28.5T800-520q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440Zm0-160q-17 0-28.5-11.5T760-640q0-17 11.5-28.5T800-680q17 0 28.5 11.5T840-640q0 17-11.5 28.5T800-600Z" /></svg></button>

<button popovertarget="font-options"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M256-240h84l44-122h192l44 122h84L522-720h-84L256-240Zm152-192 70-198h4l70 198H408ZM160-80q-33 0-56.5-23.5T80-160v-640q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v640q0 33-23.5 56.5T800-80H160Zm0-80h640v-640H160v640Zm0-640v640-640Z"/></svg></button>

<script type="module" src="assets/js/font.js"></script>
<!-- index.js must be manually included in all pages that don't use this component so that the service worker is registered regardless of the page the user visits. -->
<script type="module" src="assets/js/index.js"></script>
<script type="module" src="assets/js/toc.js"></script>