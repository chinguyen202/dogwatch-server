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

// Add services to sitter
const addServiceToSitter = async (req, res) => {
  const { serviceId } = req.body;
  try {
    // Find the sitter
    const sitter = await User.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!sitter) return res.status(404).json({ message: 'User is not found' });

    // Find the service
    const service = await Service.findOne({
      where: {
        uuid: serviceId,
      },
    });
    if (!service)
      return res.status(404).json({ message: 'Service is not found' });

    // Add the services to sitter
    await sitter.addService(service, { through: { selfGranted: false } });
    res.status(201).json({
      message: `Service ${service.name} is added to user with email ${sitter.email}`,
    });
  } catch (error) {
    console.error('Error adding services to user:', error);
    return res.status(500).json({
      message: 'An error occurred while adding services to the user.',
    });
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
    const currentServiceNames = currentServices.map((service) => service.name);

    // Compare and update services offered by the sitter
    // Find out if there are services to be added
    const servicesToAdd = selectedServices.filter(
      (serviceName) => !currentServiceNames.includes(serviceName)
    );
    // Find out if there are services to be removed
    const servicesToRemove = currentServiceNames.filter(
      (serviceName) => !selectedServices.includes(serviceName)
    );
    // Add new services that are not already offered
    if (servicesToAdd.length > 0) {
      const services = await Service.findAll({
        where: { name: servicesToAdd },
      });
      console.log(`Services to be added are ${services}`);
      await sitter.addServices(services);
    }
    // Remove services that are no longer selected
    if (servicesToRemove.length > 0) {
      const services = await Service.findAll({
        where: { name: servicesToRemove },
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
  addServiceToSitter,
  createService,
  updateService,
  deleteService,
  updateServiceByUserId,
};
