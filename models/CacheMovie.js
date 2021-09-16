'use strict';
class Cache{
    constructor(){
        this.data=[];
        this.timestamp=new Date();
        this.key='query-' + query;
    }
}
module.exports = Cache;