const repo = require('../../repo');
const config = require('../../config');

class admindashboardservices{
    static async aggregatesystemstats(){
        return{
            version:config.dashboard_version,
         widget:config.widget_config,
        lastrefreshed: new Date().toISOString(),
    alerts:[]
      }
    }
}

module.exports = admindashboardservices;