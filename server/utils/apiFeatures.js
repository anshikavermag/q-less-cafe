class APIFeatures {
    constructor(dbQuery, queryObj) {
        this.dbQuery = dbQuery;
        this.queryObj = queryObj;
    }

    filter() {
        // Excluding certain fields that we need to process our query further
        const query = { ...this.queryObj };
        const excludedFields = ['sort', 'fields', 'page', 'limit'];
        excludedFields.forEach((field) => delete query[field]);

        // Adding MongoDB operator symbol ($) before operators in query
        let queryStr = JSON.stringify(query);
        queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        // Saving the final query
        this.dbQuery = this.dbQuery.find(JSON.parse(queryStr));

        return this;
    }

    sort() {
        if (this.queryObj.sort) {
            const sortBy = this.queryObj.sort.split(',').join(' ');
            this.dbQuery = this.dbQuery.sort(sortBy);
        }

        return this;
    }

    project() {
        if (this.queryObj.fields) {
            let selectBy = this.queryObj.fields.split(',').join(' ');
            if (selectBy.includes('-')) {
                selectBy += ' -__v';
            }
            this.dbQuery = this.dbQuery.select(selectBy);
        } else {
            this.dbQuery = this.dbQuery.select('-__v');
        }

        return this;
    }

    paginate() {
        const page = this.queryObj.page || 1;
        const limitBy = this.queryObj.limit || 10;
        const skipBy = (page - 1) * limitBy;
        this.dbQuery = this.dbQuery.skip(skipBy).limit(limitBy);

        return this;
    }
}

export default APIFeatures;
