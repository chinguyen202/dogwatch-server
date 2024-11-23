const { User, Service } = require('../../models/index');

// Create service
const createService = async (req, res) => {
  const { name } = req.body;
  try {
    await Service.create({
      name: name,
    });
    res.status(201).json({ message: 'Service created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all services
const getServices = async (req, res) => {
  try {
    const response = await Service.findAll();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a service by its id
const getServiceById = async (req, res) => {
  try {
    const response = await Service.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all services of a sitter
const getServicesByUserId = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        uuid: req.params.id,
      },
      include: {
        model: Service,
        through: { attributes: [] },
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update services By Sitter Id
const updateServiceByUserId = async (req, res) => {
  const selectedServices = req.body.services; // Array of service name
  try {
    // Find the sitter
    const sitter = await User.findOne({
      where: {
        uuid: req.params.id,
      },
      include: {
        model: Service,
        through: { attributes: [] },
      },
    });
    if (!sitter) return res.status(404).json({ message: 'User is not found' });

    // Fetch current services offered by the user (sitter)
    const currentServices = await sitter.getServices();
    const currentServiceIds = currentServices.map((service) => service.uuid);

    // Compare and update services offered by the sitter
    // Find out if there are services to be added
    const servicesToAdd = selectedServices.filter(
      (serviceId) => !currentServiceIds.includes(serviceId)
    );
    // Find out if there are services to be removed
    const servicesToRemove = currentServiceIds.filter(
      (serviceId) => !selectedServices.includes(serviceId)
    );
    // Add new services that are not already offered
    if (servicesToAdd.length > 0) {
      const services = await Service.findAll({
        where: { uuid: servicesToAdd },
      });
      console.log(`Services to be added are ${services}`);
      await sitter.addServices(services);
    }
    // Remove services that are no longer selected
    if (servicesToRemove.length > 0) {
      const services = await Service.findAll({
        where: { uuid: servicesToRemove },
      });
      console.log(`Services to be removed are ${services}`);
      await sitter.removeServices(services);
    }
    res.status(200).json({ message: 'Services updated successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error updating services ${error.message}` });
  }
};

// Update service
const updateService = async (req, res) => {};

// Delete services
const deleteService = async (req, res) => {};

module.exports = {
  getServices,
  getServicesByUserId,
  createService,
  updateService,
  deleteService,
  updateServiceByUserId,
  getServiceById,
};
