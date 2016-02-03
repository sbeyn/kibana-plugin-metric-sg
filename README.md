
kibana-plugin-supmetric
=======================


Introduction
-------------

Ce plugin permet la création d'une vue avec plusieurs types de graphiques sur Kibana Version 4.3.0:

* Choix du type du format nombre (pourcentage, heure, durée, relatifif)
* Définition du label


Contenu
-------
```
.
+-- index.js
+-- package.json
+-- public
    +-- bower_components
    ¦   +-- moment
    +-- line_sg_controller.js
    +-- line_sg.html
    +-- line_sg.js
    +-- line_sg.less
    +-- line_sg_params.html
    +-- styles
        +-- accordion.css
```
Le plugin a été créé à partir des librairies Kibana et basé sur le framework Angularjs.

Liste des librairies ajoutées:

* moment.js: Parse, validate, manipulate, and display dates in JavaScript.(http://momentjs.com/)


Installation
------------

**1)** Ajouter le plugin 
```
	$ cd <path>/kibana/src/plugins
	$ git clone <depot> metric-sg	
```

**2)** Redémarrer kibana 
```
	$ sudo supervisorctl restart kibana
```
