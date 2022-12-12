import multer from 'multer';
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads')
    },
    filename:function(req,file,cb){   //cb=callback
        console.log(file.mimetype)
        const ext=file.mimetype.split("/")[1];
        cb(null,file.fieldname + '-' + Date.now()+"."+ext)
    }
})

export const upload = multer({storage:storage})           