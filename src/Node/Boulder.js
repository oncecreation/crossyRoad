import React, {Component} from 'react';
import Generic from './Generic';

export default class Boulder extends Generic {
  setup = async () => {
    for (let i = 0; i < 2; i++) {
      const model = await this._download(`boulder_${i}`);
      this.models[`${i}`] = model;
    }
    return this.models;
  }
}
