/*
 * Copyright (C) 2011 Flamingo Project (http://www.cloudine.io).
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
Ext.define('Flamingo2.view.monitoring.cldb.FileCount', {
    extend: 'Ext.Panel',
    alias: 'widget.cldbFileCount',

    layout: 'fit',
    border: false,

    initComponent: function () {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            fields: ['num', 'totalFiles', 'reg_dt'],
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: CONSTANTS.MONITORING.CLDB.METRICS,
                extraParams: {
                    clusterName: ENGINE.id
                },
                remoteSort: true,
                reader: {
                    type: 'json',
                    rootProperty: 'list',
                    totalProperty: 'total'
                }
            }
        });

        me.items = {
            xtype: 'cartesian',
            border: false,
            store: store,
            insetPadding: 20,
            interactions: 'itemhighlight',
            axes: [
                {
                    type: 'numeric',
                    fields: 'totalFiles',
                    position: 'left',
                    grid: true,
                    titleMargin: 20,
                    renderer: function (value) {
                        return toCommaNumber(value);
                    },
                    label: {
                        fontFamily: 'Nanum Gothic',
                        fontSize: '12px'
                    }
                }
            ],
            animation: Ext.isIE8 ? false : {
                easing: 'bounceOut',
                duration: 500
            },
            series: [
                {
                    type: 'area',
                    axis: 'left',
                    title: message.msg('monitoring.namenode.total_files'),
                    xField: 'num',
                    yField: 'totalFiles',
                    style: {
                        opacity: 0.50,
                        minGapWidth: 20,
                        fill: '#E68A00', // backgroud color
                        stroke: 'black' // line color
                    },
                    marker: {
                        opacity: 0,
                        scaling: 0.01,
                        fx: {
                            duration: 200,
                            easing: 'easeOut'
                        }
                    },
                    highlightCfg: {
                        opacity: 1,
                        scaling: 1.5
                    },
                    tooltip: {
                        trackMouse: true,
                        style: 'background: #fff',
                        renderer: function (storeItem, item) {
                            this.setHtml(dateFormat2(storeItem.get('reg_dt')) + ' : <font color="#CC2900"><b>' + toCommaNumber(storeItem.get('totalFiles')) + '</b></font>');
                        }
                    }
                }
            ]
        };

        me.callParent(arguments);
    }
});