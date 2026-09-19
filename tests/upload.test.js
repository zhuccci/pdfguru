import test from 'node:test';
import assert from 'node:assert/strict';
import { validateFile, MAX_FILE_SIZE } from '../src/components/UploadZone.js';
test('accepts supported files through the exact size limit', () => {
  assert.equal(validateFile({name:'DOCUMENT.PDF',size:MAX_FILE_SIZE}), '');
});
test('rejects oversized, unsupported and missing files', () => {
  assert.match(validateFile({name:'large.pdf',size:MAX_FILE_SIZE+1}), /100 MB/);
  assert.match(validateFile({name:'program.exe',size:1024}), /not supported/);
  assert.match(validateFile(null), /Choose a file/);
});
