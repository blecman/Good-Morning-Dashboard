"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var stop_1 = require('./stop');
var BusComponent = (function () {
    function BusComponent(http) {
        this.http = http;
        this.stops = [];
        this.stopIds = ['1008', '1056'];
        for (var _i = 0, _a = this.stopIds; _i < _a.length; _i++) {
            var stopId = _a[_i];
            this.stops.push(null);
        }
    }
    BusComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.updateStops();
        setInterval(function () { _this.updateStops(); }, 10000);
    };
    BusComponent.prototype.updateStops = function () {
        var _this = this;
        var _loop_1 = function(i) {
            this_1.http.get("http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=rutgers&stopId=" + this_1.stopIds[i])
                .toPromise()
                .then(function (response) { return _this.stops[i] = new stop_1.Stop(response.text()); })
                .catch();
        };
        var this_1 = this;
        for (var i = 0; i < this.stops.length; i++) {
            _loop_1(i);
        }
    };
    BusComponent = __decorate([
        core_1.Component({
            selector: 'bus',
            template: "\n    \n        <br/>\n    <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n            <div *ngFor=\"let stop of stops\">\n                <span *ngIf=\"stop\">\n                    <div class=\"row\" *ngFor=\"let route of stop.routes\">\n                        <div class=\"col-md-6\">\n                            <p>\n                                <b style=\"font-size:2em; vertical-align:middle\">{{route.title}}</b>\n                                &nbsp;&nbsp;<b [style.color]=\"route.firstPredictionColor()\" style=\"font-size:1.5em; vertical-align:middle\">{{route.firstPrediction()}} min</b> <br/>\n                            </p>\n                        </div>\n\n                        <div class=\"col-md-6\" style=\"text-align:right\">\n                            <p style=\"color:#373D3F\">\n                                <span style=\"font-size:2em; vertical-align:middle\">&nbsp;</span>\n                                <span style=\"font-size:1.5em; vertical-align:middle\">{{route.tailPredictions()}} min &nbsp;</span>\n                            </p>\n                            \n                        </div>\n                        <hr /> <br/>\n                    </div>\n                </span>\n            </div>\n        </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], BusComponent);
    return BusComponent;
}());
exports.BusComponent = BusComponent;
//# sourceMappingURL=bus.component.js.map