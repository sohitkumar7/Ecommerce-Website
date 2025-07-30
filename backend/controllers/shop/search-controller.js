import Product from "../../models/Product.js" 

export const SearchProduct = async(req,res) => {

    try {
        
        const {keyword} = req.params
        if(!keyword || typeof keyword !== 'string'){
            return res.status(400).json({
                success:false,
                message: "Keyword is required and must be in a String"
            })
        }

        const regEx = new RegExp(keyword,'i')

        const CreateSearchQuerry = {
            $or : [
                {title:regEx},
                {description:regEx},
                {category:regEx},
                {brand:regEx}
            ]
        }

        const searchResults = await Product.find(CreateSearchQuerry);
        res.status(200).json({
            success:true,
            data:searchResults
        })  

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}