import add from './add'
import { expect } from 'chai'

describe('add function', function() {
  it('1 plus 1 equal to 2', function() {
    expect(add(1, 1)).to.be.equal(2);
  })
})
