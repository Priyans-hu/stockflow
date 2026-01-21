const Inventory = require('../models/InventoryModel');

const getAllInventory = async (req, res) => {
    try {
        const inventoryItems = await Inventory.find();
        res.json(inventoryItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getInventoryById = async (req, res) => {
    try {
        const inventoryItem = await Inventory.findById(req.params.id);
        if (!inventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        res.json(inventoryItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createInventory = async (req, res) => {
    try {
        const { product, quantityInStock } = req.body;

        // Validate required fields
        if (!product || !quantityInStock) {
            return res.status(400).json({ message: 'Product and quantityInStock are required for creating an inventory item' });
        }

        const newInventoryItem = new Inventory({ product, quantityInStock });
        const savedInventoryItem = await newInventoryItem.save();
        res.status(201).json(savedInventoryItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateInventory = async (req, res) => {
    try {
        const updatedInventoryItem = await Inventory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true },
        );
        if (!updatedInventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        res.json(updatedInventoryItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteInventory = async (req, res) => {
    try {
        const deletedInventoryItem = await Inventory.findByIdAndDelete(req.params.id);
        if (!deletedInventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        res.json({ message: 'Inventory item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllInventory,
    getInventoryById,
    createInventory,
    updateInventory,
    deleteInventory,
};
