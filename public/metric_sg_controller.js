define(function (require) {
  // get the kibana/metric_sg module, and make sure that it requires the "kibana" module if it
  // didn't already
  var d3 = require('d3');
  var moment = require('./bower_components/moment/moment');
  var module = require('ui/modules').get('kibana/metric_sg', ['kibana']);

  module.controller('KbnMetricsgVisController', function ($scope, Private) {
    var tabifyAggResponse = Private(require('ui/agg_response/tabify/tabify'));

    $scope.$root.editorMetric = {};
    $scope.$root.editorMetric.typeformat = ["Duration","Percents","Seconds","Octets","Euros"];

    var metrics = $scope.metrics = [];
    var label = {};

    var formatd3 = function(d,type) {
         var formatValue = "";
         moment.locale('fr', {
 	     months : "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
 	     monthsShort : "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
 	     weekdays : "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
 	     weekdaysShort : "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
 	     weekdaysMin : "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
 	     longDateFormat : {
 	         LT : "HH:mm",
 	         LTS : "HH:mm:ss",
 	         L : "DD/MM/YYYY",
 	         LL : "D MMMM YYYY",
 	         LLL : "D MMMM YYYY LT",
 	         LLLL : "dddd D MMMM YYYY LT"
 	     },
 	     calendar : {
 	         sameDay: "[Aujourd'hui à] LT",
 	         nextDay: '[Demain à] LT',
 	         nextWeek: 'dddd [à] LT',
 	         lastDay: '[Hier à] LT',
 	         lastWeek: 'dddd [dernier à] LT',
 	         sameElse: 'L'
 	     },
 	     relativeTime : {
 	         future : "dans %s",
 	         past : "il y a %s",
 	         s : "%d secondes",
 	         m : "une minute",
 	         mm : "%d minutes",
 	         h : "une heure",
 	         hh : "%d heures",
 	         d : "un jour",
 	         dd : "%d jours",
 	         M : "un mois",
 	         MM : "%d mois",
 	         y : "une année",
 	         yy : "%d années"
 	     },
 	     ordinalParse : /\d{1,2}(er|ème)/,
 	     ordinal : function (number) {
 	         return number + (number === 1 ? 'er' : 'ème');
 	     },
 	     meridiemParse: /PD|MD/,
 	     isPM: function (input) {
 	         return input.charAt(0) === 'M';
 	     },
 	     meridiem : function (hours, minutes, isLower) {
 	         return hours < 12 ? 'PD' : 'MD';
 	     },
 	     week : {
 	         dow : 1, // Monday is the first day of the week.
 	         doy : 4  // The week that contains Jan 4th is the first week of the year.
 	     }
 	 });
         switch (type)
             {
                case 'Duration': return moment.duration(d, 'seconds').humanize();
                break;
             
                case 'Percents': formatValue = d3.format(".3s"); return formatValue(d) + "%";
                break;
             
                case 'Seconds': formatValue = d3.format(".3s"); return formatValue(d) + "s";
                break;
             
                case 'Octets': formatValue = d3.format(".3s"); return formatValue(d) + "o";
                break;
             
                case 'Euros': formatValue = d3.format(",.0f"); return formatValue(d) + "€";
                break;
             
                default: return d;
             }
    }

    $scope.processTableGroups = function (tableGroups) {
      tableGroups.tables.forEach(function (table) {
        table.columns.forEach(function (column, i) {
          var fieldFormatter = table.aggConfig(column).fieldFormatter();
	  var d = "data" + i;
	  label[d] = column.title;
          var title = (typeof $scope.vis.params.configMetric.label != "undefined") ? $scope.vis.params.configMetric.label[d] : column.title;
          var type = (typeof $scope.vis.params.configMetric.format != "undefined") ? $scope.vis.params.configMetric.format[d] : "";
          metrics.push({
            label: title,
            data: d,
            value: formatd3( table.rows[0][i], type)
          });
        });
      });
      $scope.$root.editorMetric.label = label;
console.log(metrics);
    };

    $scope.$watch('esResponse', function (resp) {
      if (resp) {
        metrics.length = 0;
        $scope.processTableGroups(tabifyAggResponse($scope.vis, resp));
      }
    });
  });
});
