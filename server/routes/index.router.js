const express = require('express');
const router = express.Router();
mongoose = require('mongoose');
multer = require('multer');
const nodemailer = require('nodemailer');
// const MongoClient = require('mongodb').MongoClient
// const db             = require('../models/db');
const ctrlUser = require('../controllers/user.controller');
const ctrlClient = require('../controllers/hodoff.controller');
const ctrlInvoice = require('../controllers/inwart.controller');
const ctrlstar = require('../controllers/star.controller');
const ctrlevents = require('../controllers/events.controller');
const ctrlTask = require('../controllers/task.controller');
const ctrlfolders = require('../controllers/folders.controller');
const ctrlQuotation = require('../controllers/quotation.controller');
const ctrlPurchase = require('../controllers/purchaseorder.controller');
const ctrlDelivery = require('../controllers/delivery-challan.controller');
const ctrlVendorCre = require('../controllers/vendorcre.controller');
const ctrlVendorDoc = require('../controllers/vendordoc.controller');
const ctrlLogin = require('../controllers/userlogin.controller');
const ctrlMessage = require('../controllers/message.controller');


//importing cloudinary and config
const cloudinary=require('cloudinary');
cloudinary.config({
    cloud_name:'scls',
    api_key:'244319535524477',
    api_secret:'qKkTQqGIYEzHpnB4ijfsEIhy-Zc'
})

//importing multer storage
const storage=require('multer-storage-cloudinary');
var cloudstorage=storage({
    cloudinary:cloudinary,
    folder:'movie',
    allowedFormats:['jpg','png','pdf'],
    filename:function(req,file,cb){
        cb(undefined,file.fieldname+'_'+Date.now())
    }
})

//importing & configmulter

var upload=multer({storage:cloudstorage}); 


router.post('/register', ctrlUser.register);
router.get('/allemployes', ctrlUser.allemployes);
router.post('/userProfile', ctrlUser.userProfile);


router.post('/clientcre', ctrlClient.clientcre);
router.get('/clientdetails', ctrlClient.clientdetails);
router.post('/getdet', ctrlClient.getdet);
router.post('/updateclientlength', ctrlClient.updateclientlength);
router.post ('/updatedchallanlength',ctrlClient.updatedchallanlength);
router.post('/updateinvoicelength',ctrlClient.updateinvoicelength)
router.get('/clientToday',ctrlClient.clientToday)
router.get('/clientMonth',ctrlClient.clientMonth)
router.get('/clientWeekly',ctrlClient.clientWeekly)





router.post('/alldata', ctrlInvoice.alldata);
router.get('/getinvoice', ctrlInvoice.getinvoice);
router.post('/updateoption', ctrlInvoice.updateoption);
router.post('/checked', ctrlInvoice.checked);
router.post('/getidpdf', ctrlInvoice.getidpdf);
router.post('/toarchive', ctrlInvoice.toarchive);
router.post('/getactiveinvoice', ctrlInvoice.getactiveinvoice);
router.post('/getarchiveinvoice', ctrlInvoice.getarchiveinvoice);
router.post('/sendifoldername',ctrlInvoice.sendifoldername);
router.post('/postfnamei',ctrlInvoice.postfnamei);
router.post('/getdatatopdf',ctrlInvoice.getdatatopdf)
router.post('/getinvoicefolderuser',ctrlInvoice.getinvoicefolderuser)



router.post('/alldatas', ctrlstar.alldatas)
router.get('/getactiveexpenses',ctrlstar.getactiveexpenses)
router.get('/getactivedata',ctrlstar.getactivedata)
router.put('/updateexpoption',ctrlstar.updateexpoption)
router.post('/gettitledata',ctrlstar.gettitledata)
router.post('/checkedexp',ctrlstar.checkedexp)
router.post('/toarchiveexp',ctrlstar.toarchiveexp)
router.post('/getarchiveexpense',ctrlstar.getarchiveexpense)
router.post('/sendfoldername',ctrlstar.sendfoldername)
router.post('/postfnameexp',ctrlstar.postfnameexp)
router.post('/getmonthexp',ctrlstar.getmonthexp)

router.post('/postevent',ctrlevents.postevent)
router.get('/getevent',ctrlevents.getevent)


//tasks
router.post('/newtask', ctrlTask.newtask);
router.get('/complttask', ctrlTask.complttask);
router.get('/getnewtask', ctrlTask.getnewtask);
router.post('/editingdata', ctrlTask.editingdata);
router.post('/deletedata', ctrlTask.deletedata);
// router.get('/getalltasks',ctrlTask.getalltasks);

//folders

router.post('/postfolders',ctrlfolders.postfolders)
router.get('/getfolders',ctrlfolders.getfolders)


router.get('/getactiveonly',ctrlInvoice.getactiveonly);
router.get('/getarchiveonly',ctrlInvoice.getarchiveonly);
router.post('/getactiveuserinvoice',ctrlInvoice.getactiveuserinvoice)
router.post('/getarchiveuserinvoice',ctrlInvoice.getarchiveuserinvoice)
router.post('/individualinvoice',ctrlInvoice.individualinvoice)
router.post('/clientInvoice',ctrlInvoice.clientInvoice)


router.get('/getarchiveddata',ctrlstar.getarchiveddata);


//Qout
router.post('/quotpost',ctrlQuotation.quotpost);
router.get ('/getquotation',ctrlQuotation.getquotation);
router.post ('/getactivequotation',ctrlQuotation.getactivequotation);
router.post ('/updatequotoption',ctrlQuotation.updatequotoption);
router.post ('/quotchecked',ctrlQuotation.quotchecked);
router.get ('/quotarchonly',ctrlQuotation.quotarchonly);
router.post ('/getdata',ctrlQuotation.getdata);
router.post ('/getquotdata',ctrlQuotation.getquotdata);
router.post ('/getactiveuserquotation',ctrlQuotation.getactiveuserquotation);
router.post ('/getarchiveuserquotation',ctrlQuotation.getarchiveuserquotation);
router.post ('/getquotationfolderuser',ctrlQuotation.getquotationfolderuser);
router.post ('/userquotation',ctrlQuotation.userquotation);
router.post ('/individualquot',ctrlQuotation.individualquot);
router.post ('/employeequotation',ctrlQuotation.employeequotation);
router.get ('/quotationweekly',ctrlQuotation.quotationweekly);
router.get ('/monthdata',ctrlQuotation.monthdata);
router.get ('/today',ctrlQuotation.today);
router.post ('/clientquots',ctrlQuotation.clientquots);


//purchase
router.get ('/allpurchaseorders',ctrlPurchase.allpurchaseorders);
router.post ('/getvpurchasedata',ctrlPurchase.getvpurchasedata);
router.post ('/purchasepost',ctrlPurchase.purchasepost);
router.get ('/purchaseactive',ctrlPurchase.purchaseactive);
router.get ('/purchasearchive',ctrlPurchase.purchasearchive);
router.post ('/purchasechecked',ctrlPurchase.purchasechecked);
router.post ('/updatepurchaseoption',ctrlPurchase.updatepurchaseoption);
router.post ('/approvedquot',ctrlQuotation.approvedquot);
router.post ('/apppurchaseorders',ctrlPurchase.apppurchaseorders);
router.post ('/getpurchasedata',ctrlPurchase.getpurchasedata);

//delivery 
 router.post ('/deliverypost',ctrlDelivery.deliverypost);
 router.get ('/alldeliverychaorders',ctrlDelivery.alldeliverychaorders);
 router.get ('/deliverychaactive',ctrlDelivery.deliverychaactive);
 router.get ('/deliverychaarchive',ctrlDelivery.deliverychaarchive);
 router.post ('/deliverychachecked',ctrlDelivery.deliverychachecked);
 router.post ('/updatedeliverychaoption',ctrlDelivery.updatedeliverychaoption);
 router.post ('/appdeliverychaorders',ctrlDelivery.appdeliverychaorders);
 router.post ('/pdfdata',ctrlQuotation.pdfdata);
 router.post ('/deliverybyname',ctrlDelivery.deliverybyname);
 router.post ('/getdeliverydata',ctrlDelivery.getdeliverydata);
 router.post ('/getpdeliverydata',ctrlDelivery.getpdeliverydata);
 router.post ('/getarchiveuserdelivery',ctrlDelivery.getarchiveuserdelivery);
 router.post ('/getactiveuserdelivery',ctrlDelivery.getactiveuserdelivery);
 router.post ('/getdeliveryfolderuser',ctrlDelivery.getdeliveryfolderuser);
 router.post ('/individualdelivery',ctrlDelivery.individualdelivery);
 router.post ('/clientDchallan',ctrlDelivery.clientDchallan);

 
 
 router.post('/getinvoicefolder',ctrlInvoice.getinvoicefolder)

   
 //vendor
  router.post('/vendorcre',ctrlVendorCre.vendorcre);
  router.get('/vendordetails',ctrlVendorCre.vendordetails);
  router.post('/vendorgetdet',ctrlVendorCre.vendorgetdet);


 
  router.post('/getinvoicedata',ctrlDelivery.getinvoicedata)


 //ctrlVendorDoc 
 router.post('/documentvendor',upload.single('avatar'), ctrlVendorDoc.documentvendor)
 router.get('/getdocument',ctrlVendorDoc.getdocument)
 router.post('/getvendordocs', ctrlVendorDoc.getvendordocs)
 router.post('/vendormonth', ctrlVendorDoc.vendormonth)
 router.post('/vendormonthdocs', ctrlVendorDoc.vendormonthdocs)

 //ctrlLogin
 router.post('/logindata', ctrlLogin.logindata)
 router.post('/getlogindatabyid', ctrlLogin.getlogindatabyid)
 router.post('/logoutdatabyid', ctrlLogin.logoutdatabyid)
 router.get('/logindetails', ctrlLogin.logindetails)

 router.get('/getlogindata',ctrlLogin.getlogindata)
 router.get('/logingetbydate',ctrlLogin.logingetbydate)


 //ctrlMessage
 router.post('/newmessage', ctrlMessage.newmessage)
 router.post('/particularmessage', ctrlMessage.particularmessage)
 router.post('/messagepush',ctrlMessage.messagepush)



 
module.exports = router;



