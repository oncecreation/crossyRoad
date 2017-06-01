import React, {Component} from 'react';
import Generic from './Generic';

export default class Boulder extends Generic {
  setup = async () => {
    const {environment: {boulder: boulder } } = this.globalModels;
    for (let i = 0; i < 2; i++) {
      const model = await this._download(boulder[`${i}`]);
      this.models[`${i}`] = model;
    }
    return this.models;
  }
}
