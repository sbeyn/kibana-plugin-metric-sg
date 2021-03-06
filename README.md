
kibana-plugin-metric-sg
=======================


Introduction
-------------

Ce plugin permet la création d'une vue avec plusieurs types de graphiques sur Kibana Version 4.x:

* Choix du type du format nombre (pourcentage, heure, durée, relatifif)
* Définition du label
* Paramétrage de la taille
* Alertes visuelles

Contenu
-------
```
.
├── index.js
├── package.json
├── public
│   ├── bower_components
│   │   └── moment
│   ├── metric_sg_controller.js
│   ├── metric_sg.html
│   ├── metric_sg.js
│   ├── metric_sg.less
│   ├── metric_sg_params.html
│   └── styles
│       └── accordion.css
└── README.md
```
Le plugin a été créé à partir des librairies Kibana et basé sur le framework Angularjs.

Liste des librairies ajoutées:

* moment.js: Parse, validate, manipulate, and display dates in JavaScript.(http://momentjs.com/)


Installation
------------

**1)** Ajouter le plugin 
```
	$ cd <path>/kibana/installedPlugins
	$ git clone <depot> metric-sg	
```

**2)** Redémarrer kibana 
```
	$ sudo supervisorctl restart kibana
```
