const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,  
    },
    unitPrice: {
        type: Number,
        required: true,
        min: 0,  
    }
});

const AltSchema = new mongoose.Schema({
    currentUser: {
        type: String
    },
    invoiceNumber: {
        type: String,
        required: true,
    },
    setDate: {
        type: String,
        required: true,
    },
    dueDate: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    billTo: {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        cityStateZip: {
            type: String,
            required: true,
        }
    },
    billFrom: {
        nameTwo: {
            type: String,
            required: true,
        },
        addressTwo: {
            type: String,
            required: true,
        },
        cityStateZipTwo: {
            type: String,
            required: true,
        }
    },
    items: [ItemSchema],  
    taxPercentage: {
        type: Number,
        required: true,
        min: 0,   
    }

}, { timestamps: true });

module.exports = mongoose.model("Alt", AltSchema);
