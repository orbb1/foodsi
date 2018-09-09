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
            });
        }
        return arr;
    };

    var drawChart = function(cleanData) {
        var svgWidth = 1000, 
            svgHeight = 600,
            margin = { top: 20, right: 10, bottom: 50, left: 50 },
            width = svgWidth - margin.right,
            height = svgHeight - margin.top - margin.bottom;
        
        var svg = d3.select('svg.line-chart')
            .attr('width', svgWidth)
            .attr('height', svgHeight);

        var xScale = d3.scaleLinear().domain([
            d3.min(cleanData, function(d) {return d.time}),
            d3.max(cleanData, function(d) {return d.time})
        ]).range([margin.left, width]);

        var yScale = d3.scaleLinear().domain([
            d3.min(cleanData, function(d) {return d.forecast}),
            d3.max(cleanData, function(d) {return d.forecast})
        ]).range([height, margin.bottom * 2]);

        var xAxis = d3.axisBottom().scale(xScale)
            .ticks(cleanData.length/3).tickFormat(function(d, i) {
                var time = new Date(d).toString();
                return rawData[i].from;
            });
        
        var yAxis = d3.axisLeft().scale(yScale);

        var line = d3.line()
            .x(function(d){ return xScale(d.time)})
            .y(function(d){ return yScale(d.forecast)});

        var toolTipEl = d3.select('body').append('div').attr('class', 'tooltip');
        var tooltip = function(forecast) {
            toolTipEl
                .style('display', 'block')
                .style('position', 'absolute')
                .style('left', (d3.event.pageX) + 'px')		
                .style('top', (d3.event.pageY - 28) + 'px')
                .html(forecast + ' gCO2/kWh');
        }

        svg.append('g').attr('transform', 'translate(0, ' + (height - margin.bottom) + ')').call(xAxis)
            .selectAll('text').style("text-anchor", "start").attr('class', 'line-chart__x-label')
        svg.append('g').attr('transform', 'translate(' + margin.left + ', -' + margin.bottom + ')').call(yAxis);
        svg.append('path').attr('d', line(cleanData))
            .attr('transform', 'translate(0, -' + margin.bottom + ')')
            .attr('stroke', 'grey')
            .attr('stroke-width', 2)
            .attr('fill', 'none');

        var points = svg.append('g');
        points.attr('class', 'dots')
            .selectAll('circle')
            .data(cleanData)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('transform', 'translate(0, -' + margin.bottom + ')')
            .attr('cx', function(d) {return xScale(d.time)})
            .attr('cy', function(d) {return yScale(d.forecast)})
            .attr('r', 0)
            .attr('fill', 'red')
            .on('mouseover', function(d) {
                tooltip(d.forecast)
            })
            .transition()
            .duration(1000)
            .ease(d3.easeElasticOut)
            .delay(function(d, idx) {
                return idx * 50;
            })
            .attr('r', 6);
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
        $('.tooltip').remove();
    };

    return {
        init: init,
        destroy: destroy
    };
})();

return modules;
})(APP.modules || {}, jQuery);