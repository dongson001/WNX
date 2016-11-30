export function format(format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

export function addDays(date,days)
{
  date = date || new Date();
    let today = new Date(date);
    today.setDate(today.getDate() + days);
    return today;
}

export function addWeeks(date,w)
{
  date = date || new Date();
  let today = new Date(date);
  today.setDate(today.getDate() + days*7);
  return today;
}

export function addMonths(date,m)
{
  date = date || new Date();
    let today = new Date(date);
    let d = today.getDate();
    today.setMonth(today.getMonth() + m);
    if (today.getDate() < d)
        today.setDate(0);
    return today;
}

export function addYears(date,y)
{
  date = date || new Date();
    let today = new Date(date);
    var m = today.getMonth();
    today.setFullYear(today.getFullYear() + y);
    if (m < today.getMonth())
     {
        today.setDate(0);
     }
     return today;
}
