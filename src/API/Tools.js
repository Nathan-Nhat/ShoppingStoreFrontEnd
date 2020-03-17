export const convertToDate = (input)=>{
    var time = input.substring(input.indexOf('T') + 1, input.indexOf('T')+ 9);
    var day = input.substring(0, 10);
    var date = new Date(day).toDateString().substring(0,10);
    return time  + " " + date;
}