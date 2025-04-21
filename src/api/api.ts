// src/api/api.ts
import axios from 'axios';

const API_URL = 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon';

export const getDragons = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dragões:', error);
    throw error;
  }
};

export const getDragonById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dragão:', error);
    throw error;
  }
};

export const createDragon = async (dragon: { name: string; type: string }) => {
  try {
    const response = await axios.post(API_URL, dragon);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar dragão:', error);
    throw error;
  }
};

export const updateDragon = async (id: string, dragon: { name: string; type: string }) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, dragon);
    return response.data;
  } catch (error) {
    console.error('Erro ao editar dragão:', error);
    throw error;
  }
};

export const deleteDragon = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir dragão:', error);
    throw error;
  }
};