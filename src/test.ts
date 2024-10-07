import * as bcrypt from 'bcrypt';

async function testHashing() {
    const plainPassword = '1234';
    const saltRounds = 10;

    // Generate a new hash for '1234'
    const newHash = await bcrypt.hash(plainPassword, saltRounds);
    console.log('New hash:', newHash);

    // Compare '1234' with the stored hash
    const isValid = await bcrypt.compare(plainPassword, '$2a$10$piUQqBrA6IXDyzWhG1aoN.lO/REWLjOjwqYn7EGVqG1hAUDr.7sfi');
    console.log('Comparison result:', isValid);  // Should return true if it matches
}

testHashing();