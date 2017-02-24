var isRealString=(str)=>{
  return typeof str==='string' && str.trim().length>0;


};

var isUpperCaseString=(uprStr)=>{

return uprStr.toUpperCase();
};

module.exports={isRealString, isUpperCaseString};
