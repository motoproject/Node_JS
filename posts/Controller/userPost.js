import { Post } from '../Controller/userPost';

exports.findUsersPosts = async (req, res) => {
    let result;
    result = await Post.find().populate('author');
    if(result){
        res.status(200).json({
            message: "Auther details",
            results: result
        });
    }
};


