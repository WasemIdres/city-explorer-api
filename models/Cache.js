'use strict';
class Cache{
    constructor(){
        this.data=[];
        this.timestamp=new Date();
        this.key='weather-' + lat + lon;
    }
}
module.exports = Cache;