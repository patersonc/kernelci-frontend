/*!
 * Copyright (C) Linaro Limited 2015,2017,2019
 * Author: Matt Hart <matthew.hart@linaro.org>
 * Author: Milo Casagrande <milo.casagrande@linaro.org>
 *
 * kernelci dashboard.
 * 
 * 
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this library; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA
 */
define([
    'compare/events',
    'compare/factory',
    'utils/html'
], function(cevents, factory, html) {
    'use strict';
    var containerElement,
        dataBucket,
        jobCompare;

    /**
     * Initialize a job comparison.
     *
     * @param {HTMLDivElement} container: The element that should contain the
     * job comparison.
     * @param {HTMLDivElement} bucke: The element where the data list
     * options should be added. If it is not passed, a new one will be created.
    **/
    jobCompare = function(container, bucket) {
        containerElement = container;

        if (bucket !== undefined && bucket !== null) {
            dataBucket = bucket;
        } else {
            dataBucket = factory.dataBucket();
            containerElement.appendChild(dataBucket);
        }

        return jobCompare;
    };

    /**
     * Return the associated bucket element.
    **/
    jobCompare.bucket = function() {
        return dataBucket;
    };

    /**
     * Create the job comparison selection.
     * Create the baseline choice and the multiple compare targets one.
    **/
    jobCompare.create = function() {
        html.removeChildren(containerElement);
        containerElement.appendChild(factory.baseline('job', dataBucket.id));
        containerElement.appendChild(
            factory.multiCompare('job', true, dataBucket.id));
        containerElement.appendChild(factory.submitButton('job'));
        cevents.getTrees(dataBucket);

        return jobCompare;
    };

    return jobCompare;
});
