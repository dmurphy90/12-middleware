'use strict';

let storage = require('../../lib/storage');
require('jest');

let newNote = {title: 'tim', content: 'note', _id:  'abababab-abab-abab-abab-abababababab'};
let update = {title: 'dog', content: 'new note', _id:  'abababab-abab-abab-abab-abababababab'};

describe('Storage Module', function() {
  describe('#create', () => {
    it('should create a note object', () => {
      return storage.create('note', newNote)
        .then(note => expect(note).toBeInstanceOf(Object));
    });
  });
  describe('#fetchOne', () => {
    it('should return a note object', () => {
      return storage.fetchOne('note', newNote._id)
        .then(note => {
          note = JSON.parse(note.toString());
          expect(note.content).toBe('note');
        });
    });
  });
  describe('#fetchAll', () => {
    it('should return array of ids', () => {
      return storage.fetchAll('note')
        .then(ids => expect(Array.isArray(ids)).toBeTruthy());
    });
  });
  describe('#update', () => {
    it('should return an updated object', () => {
      return storage.update('note', newNote._id, update)
        .then(note => expect(note.title).toBe('dog'));
    });
  });
  describe('#delete', () => {
    it('should not return the file within the list of ids', () => {
      return storage.destroy('note', newNote._id)
        .then(() => {
          return storage.fetchAll('note')
            .then(note => {
              expect(note).not.toContain(newNote._id);
            });
        });
    });
  });
});