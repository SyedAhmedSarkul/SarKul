import mongoose, {Schema} from "mongoose";

const stockSchema = new Schema(
    {
        itemName: {
            type: String,
            required: [true, "Item name is required"],
            enum: {
                values: [
                    "printer",
                    "scanner",
                    "desktop",
                    "laptop",
                    "plotter",
                    "server",
                    "activity",
                    'cctv',
                    'UPS'
                ],
                message: "{VALUE} is not supported",
            },
        },
        stockId: {
            type: String,
            required: [true, "Stock id is required"],
        },
        itemPart: {
            type: String,
        },
        serialNumber: {
            type: String,
        },
        configuration: {
            type: String,
        },
        modelNumber: {
            type: String,
            required: [true, "Model number is required"],
        },
        amcStartDate: {
            type: Date,
        },
        amcEndDate: {
            type: Date,
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
        },
        condition: {
            type: String,
            enum: {
                values: ["faulty", "working", "damaged", 'new'],
                message: "{VALUE} is not supported",
            },
            default: "working",
        },
        status: {
            type: String,
            enum: {
                values: ['available', 'unavailable'],
                message: "{VALUE} is not supported",
            },
            default: 'available',
        }
    },
    {timestamps: true}
);

export const Stock = mongoose.model("Stock", stockSchema);
