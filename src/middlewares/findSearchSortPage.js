"use strict"

module.exports= (req, res, next) =>{
     //! Searching  URL?search[key1]=value1&search[key2]=value2
        //? https://www.mongodb.com/docs/manual/reference/operator/query/regex/

        const search =req.query?.search || {}
        for(let key in search) search[key]= {$regex: search[key], $options: "i"}  // icinde arama yapabilmek icin regex olarak yazdik

        //! Sorting   URL?sort[key1]=1&sort[key2]=-1 (1=ASC, -1=DESC)
        //? https://www.bmc.com/blogs/mongodb-sorting
        const sort = req.query?.sort || {}
        
        //! Pagination  URL?page=1&limit=10
        let limit= Number(req.query?.limit)
        limit=limit > 0 ? limit : Number (process.env?.PAGE_SIZE || 20)
        let page= Number(req.query?.page)
        page = (page > 0 ? page : 1 )-1

        let skip= Number(req.query?.skip) || (page*limit)

        //RUN:
        req.getModelList = async(Model, populate=null)=>{
            return await Model.find(search).sort(sort).skip(skip).limit(limit).populate(populate)
        }
        next()
    }