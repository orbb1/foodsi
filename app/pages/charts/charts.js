'use strict';

APP.modules = (function(modules, $) {
    var $sectionContent = $('.section__content'),
        template = '/pages/charts/tmpl-charts.html';

    var createLineChart = function(rawData) {
        var parseData = function(rawData) {
            var arr = [];
            for (var i = 0; i<rawData.length; i++) {
                arr.push({
                    time: Date.parse(rawData[i].from),
                    forecast: rawData[i].intensity.forecast
                })
            };
            return arr;
        };

        var drawChart = function(cleanData) {
            var svgWidth = 900, 
                svgHeight = 600,
                margin = { top: 50, right: 20, bottom: 50, left: 50 },
                width = svgWidth - margin.left - margin.right,
                height = svgHeight - margin.top - margin.bottom;
            
            var svg = d3.select('svg.line-chart')
                .attr('width', svgWidth)
                .attr('height', svgHeight);

            var g = svg.append("g")
                .attr('transform', 'translate(' + margin.left + ', -' + margin.bottom + ')');

            var xScale = d3.scaleLinear().domain([
                d3.min(cleanData, function(d) {return d.time}),
                d3.max(cleanData, function(d) {return d.time})
            ]).range([margin.left, width]);

            var yScale = d3.scaleLinear().domain([
                d3.min(cleanData, function(d) {return d.forecast}),
                d3.max(cleanData, function(d) {return d.forecast})
            ]).range([height, margin.bottom]);

            var xAxis = d3.axisBottom().scale(xScale)
                .ticks(cleanData.length).tickFormat(function(d) {
                    var time = new Date(d).toString();
                    return time.split(' GMT')[0];
                });
            
            var yAxis = d3.axisLeft().scale(yScale);

            var line = d3.line()
                .x(function(d){ return xScale(d.time)})
                .y(function(d){ return yScale(d.forecast)})
                .curve(d3.curveBasis);

            svg.append('g').attr('transform', 'translate(0, ' + (height - margin.bottom) + ')').call(xAxis)
                .selectAll('text').style("text-anchor", "start").attr('class', 'line-chart__x-label')
            svg.append('g').attr('transform', 'translate(' + margin.left + ', -' + margin.bottom + ')').call(yAxis);
            svg.append('path').attr('d', line(cleanData))
                .attr('transform', 'translate(0, -' + margin.bottom + ')')
                .attr('stroke', 'blue')
                .attr('stroke-width', 2)
                .attr('fill', 'none');
            
        };
        
        drawChart(parseData(rawData));
    };

    modules.charts = (function() {
        var presentData = function(data) {
            var $spinner = $('.spinner__wrapper'),
                $contentWrapper = $('.content__wrapper');
                
            $spinner.addClass('u-hidden');
            $contentWrapper.removeClass('u-hidden');
            createLineChart(data);
        }

        var getData = function() {
            var httpService = APP.services.HttpService.getInstance();
            httpService.performRequest('GET', apiUrls.API_BASE + apiUrls.INTENSITY_DATE)
                .then(function(res) {
                    presentData(res.data);
                });
        };
        var init = function() {
            $sectionContent.load(template);
            getData();
        };

        var destroy = function() {
            $sectionContent.empty();
        };

        return {
            init: init,
            destroy: destroy
        };
    })();

    return modules;
})(APP.modules || {}, jQuery);