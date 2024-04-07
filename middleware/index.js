const admin=require('../Firebasconfig/config')

class Middleware
{
    async decodeToken(req,res,next)
    {
      
        try
        {
            const token=req.headers.authorization;
            const key=token.split(" ")[1];
            // console.log(key)
            const decodevalue=await admin.auth().verifyIdToken(key);

            if(decodevalue)
            {
                res.json({message:"Your acces to db is authorized........."});
                return next();  
            }

            return res.json({message:"Internal error"})

        }
        catch(err)
        {
            return res.json({error:err});
        }

    }

    async  deleteCodes (dept, batch)
    {
        try {
            const db = admin.firestore(); 
            const docRef = db.doc(`${dept}/${batch}/Students/MANAGER`);
            
      
            await docRef.update({
              CODE: '',
            });
      
      
        //   console.log('Codes deleted successfully!');
        //   return 'Codes deleted successfully!';
        } catch (error) {
          console.error('Error deleting codes:', error);
          throw error;
        }
      };
}

module.exports=new Middleware();