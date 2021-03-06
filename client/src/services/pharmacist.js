import Api from '@/services/Api'

export default {  
  doctorInfo (params) {
    return Api().get("/DoctorInfo/"+params )
  },
  pharmacistInfo (params) {
    return Api().get("/PharmacistInfo/"+params )
  },
  pharmacistRelation (params) {
    return Api().get("/PharmacistRelation/Pharmacist/"+params )
  },
  patientInfo(params){
    return Api().get("/PatientInfo/"+params )
  },
  //drug dispense
  getOrderId(PatientID){
    return Api().get("/DrugHistory/"+PatientID)
  },
  postOrder(params){
    return Api().post('/post/DrugOrder',params)
  },
  dispense(OrderID,DrugNo,params){
    return Api().put("/update/DrugHistory/"+OrderID+"/"+DrugNo,params)
  },
  allergicOfPatient(id){
    return Api().get('/AllergicDrug/'+id)
  },
  checkInteraction(rxcui1,rxcui2){
    return Api().get('/checkinteract/'+rxcui1+'/'+rxcui2)
  }   
}