/**
 * Escape hatch plan:
 *
 * - This details worst case scenario regarding smart contracts. Something goes wrong in our code, or even
 *   on Ethereum code itself and balances cannot be trusted
 *
 * - ETH should be continuously withdrawed to an external address to keep them safe (once a day) as founder key is not multisig
 *
 * - The FirstBlood token contract can be rewritten and balances reconstructed based on blockchain history data
 *
 * - Customers are refunded with FirstBlood token revision 2 - this could be even in a different blockchain
 *
 *
 * TODO
 *
 * - Describe management of founder key
 *
 */

contract SafeMath {
  //internals

  function safeMul(uint a, uint b) internal returns (uint) {
    uint c = a * b;
    assert(a == 0 || c / a == b);
    return c;
  }

  function safeSub(uint a, uint b) internal returns (uint) {
    assert(b <= a);
    return a - b;
  }

  function safeAdd(uint a, uint b) internal returns (uint) {
    uint c = a + b;
    assert(c>=a && c>=b);
    return c;
  }

  function assert(bool assertion) internal {
    if (!assertion) throw;
  }
}

contract Token {

    /// @return total amount of tokens
    function totalSupply() constant returns (uint256 supply) {}

    /// @param _owner The address from which the balance will be retrieved
    /// @return The balance
    function balanceOf(address _owner) constant returns (uint256 balance) {}

    /// @notice send `_value` token to `_to` from `msg.sender`
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transfer(address _to, uint256 _value) returns (bool success) {}

    /// @notice send `_value` token to `_to` from `_from` on the condition it is approved by `_from`
    /// @param _from The address of the sender
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transferFrom(address _from, address _to, uint256 _value) returns (bool success) {}

    /// @notice `msg.sender` approves `_addr` to spend `_value` tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @param _value The amount of wei to be approved for transfer
    /// @return Whether the approval was successful or not
    function approve(address _spender, uint256 _value) returns (bool success) {}

    /// @param _owner The address of the account owning tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @return Amount of remaining tokens allowed to spent
    function allowance(address _owner, address _spender) constant returns (uint256 remaining) {}

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

}

contract StandardToken is Token {

    /**
     * Reviewed:
     * - Interger overflow = OK, checked
     */
    function transfer(address _to, uint256 _value) returns (bool success) {
        //Default assumes totalSupply can't be over max (2^256 - 1).
        //If your token leaves out totalSupply and can issue more tokens as time goes on, you need to check if it doesn't wrap.
        //Replace the if with this one instead.
        if (balances[msg.sender] >= _value && balances[_to] + _value > balances[_to]) {
        //if (balances[msg.sender] >= _value && _value > 0) {
            balances[msg.sender] -= _value;
            balances[_to] += _value;
            Transfer(msg.sender, _to, _value);
            return true;
        } else { return false; }
    }

    /**
     * Allowance allowed spending - allows pull style withdraw of tokens
     *
     * Reviewed:
     * - Interger overflow = OK, checked
     */
    function transferFrom(address _from, address _to, uint256 _value) returns (bool success) {
        //same as above. Replace this line with the following if you want to protect against wrapping uints.
        if (balances[_from] >= _value && allowed[_from][msg.sender] >= _value && balances[_to] + _value > balances[_to]) {
        //if (balances[_from] >= _value && allowed[_from][msg.sender] >= _value && _value > 0) {
            balances[_to] += _value;
            balances[_from] -= _value;
            allowed[_from][msg.sender] -= _value;
            Transfer(_from, _to, _value);
            return true;
        } else { return false; }
    }

    function balanceOf(address _owner) constant returns (uint256 balance) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) constant returns (uint256 remaining) {
      return allowed[_owner][_spender];
    }

    mapping(address => uint256) balances;

    mapping (address => mapping (address => uint256)) allowed;

    uint256 public totalSupply;

}

/**
 * Security criteria evaluated against http://ethereum.stackexchange.com/questions/8551/methodological-security-review-of-a-smart-contract
 *
 *
 */
contract FirstBloodToken is StandardToken, SafeMath {
    string public name = "FirstBlood Token";
    string public symbol = "1ST";
    uint public decimals = 18;
    uint public startBlock;
    uint public endBlock;
    address public founder = 0x0;

    /* IDEA: make these numbers settable in constructor, so the contract is easier to test */
    uint public etherCap = 600000 * 10**18; //600k Ether is approximately 6.5M
    uint public transferLockup = 370285; //2 months assuming 14 second blocks
    uint public founderLockup = 2252571; //365 days assuming 14 second blocks
    uint public bountyAllocation = 2500000 * 10**18; //2.5M tokens
    uint public ecosystemAllocation = 5 * 10**16; //5%
    uint public founderAllocation = 10 * 10**16; //10%

    // TODO: Comment what is this
    bool public bountyAllocated = false;
    // TODO: Comment what is this
    bool public ecosystemAllocated = false;
    bool public founderAllocated = false;
    // TODO: Comment what is this
    uint public presaleTokenSupply = 0;

    event Buy(address indexed sender, uint eth, uint fbt);
    event Withdraw(address indexed sender, address to, uint eth);
    event AllocateFounderTokens(address indexed sender);
    event AllocateBountyAndEcosystemTokens(address indexed sender);

    function FirstBloodToken(address founderInput, uint startBlockInput, uint endBlockInput) {
      founder = founderInput;
      startBlock = startBlockInput;
      endBlock = endBlockInput;
    }

    /**
     * Security review
     *
     * - Integer overflow: does not apply, blocknumber can't grow that high
     * - Division is the last operation and constant, should not cause issues
     */
    function price() constant returns(uint) {
        if (block.number>=startBlock && block.number<startBlock+250) return 170; //power hour
        if (block.number<startBlock || block.number>endBlock) return 100; //default price
        return 100 + 4*(endBlock - block.number)/(endBlock - startBlock + 1)*67/4; //crowdsale price
    }

    function testPrice(uint blockNumber) constant returns(uint) {
        if (blockNumber>=startBlock && blockNumber<startBlock+250) return 170; //power hour
        if (blockNumber<startBlock || blockNumber>endBlock) return 100; //default price
        return 100 + 4*(endBlock - blockNumber)/(endBlock - startBlock + 1)*67/4; //crowdsale price
    }

    /**
     * Security review
     *
     * - TODO: Needs halt flag that crowdfunding can be stopped by founders in the case of something goes amiss
     *
     * - Integer math: ok - using SafeMath
     *
     *
     */
    function buy() {

        // if(halted) throw;

        if (block.number<startBlock || block.number>endBlock) throw;
        if (this.balance>etherCap) throw;
        balances[msg.sender] = safeAdd(balances[msg.sender], safeMul(msg.value, price()));
        totalSupply = safeAdd(totalSupply, safeMul(msg.value, price()));
        Buy(msg.sender, msg.value, safeMul(msg.value, price()));
    }

    /**
     * Security review
     *
     * - Integer math: ok
     */
    function buyRecipient(address recipient) {
        if (block.number<startBlock || block.number>endBlock) throw;
        if (this.balance>etherCap) throw;
        balances[recipient] = safeAdd(balances[recipient], safeMul(msg.value, price()));
        totalSupply = safeAdd(totalSupply, safeMul(msg.value, price()));
        Buy(recipient, msg.value, safeMul(msg.value, price()));
    }

    /**
     * Security review
     *
     * - Integer math: ok
     */
    function allocateFounderTokens() {
        if (msg.sender!=founder) throw;
        if (block.number <= endBlock + founderLockup) throw;
        if (founderAllocated) throw;
        if (!bountyAllocated || !ecosystemAllocated) throw;
        balances[founder] = safeAdd(balances[founder], presaleTokenSupply * founderAllocation / (1 ether));
        totalSupply = safeAdd(totalSupply, presaleTokenSupply * founderAllocation / (1 ether));
        founderAllocated = true;
        AllocateFounderTokens(msg.sender);
    }

    /**
     * Security review
     *
     * - Integer math: ok
     */
    function allocateBountyAndEcosystemTokens() {
      if (msg.sender!=founder) throw;
      if (block.number <= endBlock) throw;
      if (bountyAllocated || ecosystemAllocated) throw;
      presaleTokenSupply = totalSupply;
      balances[founder] = safeAdd(balances[founder], presaleTokenSupply * ecosystemAllocation / (1 ether));
      totalSupply = safeAdd(totalSupply, presaleTokenSupply * ecosystemAllocation / (1 ether));
      balances[founder] = safeAdd(balances[founder], bountyAllocation);
      totalSupply = safeAdd(totalSupply, bountyAllocation);
      bountyAllocated = true;
      ecosystemAllocated = true;
      AllocateBountyAndEcosystemTokens(msg.sender);
    }

    /**
     * Withdraw raised ETH to certain address by founders once the crowdsale is over
     *
     * Security review
     *
     * - This is the only critical function - see escape hatch plan
     */
    function withdraw(address to) {
        if (msg.sender!=founder) throw;
        if (block.number <= endBlock) throw;
        Withdraw(msg.sender, to, this.balance);
        if (!to.call.value(this.balance)()) throw;
    }

    /**
     * Security review
     *
     * - no issues
     */
    function changeFounder(address newFounder) {
        if (msg.sender!=founder) throw;
        founder = newFounder;
    }

    /**
     * Customers can transfer their tokens.
     *
     * Same as standard token contract, but predefined transferLockup lead time.
     *
     * Security review
     *
     * - Integer math: ok
     */
    function transfer(address _to, uint256 _value) returns (bool success) {
        // Only founders can move tokens before
        if (block.number <= endBlock + transferLockup && msg.sender!=founder) throw;
        return super.transfer(_to, _value);
    }

    /**
     * Customers can transfer their tokens.
     *
     * Same as standard token contract, but predefined transferLockup lead time.
     *
     * Security review
     *
     * - Integer math: ok
     */
    function transferFrom(address _from, address _to, uint256 _value) returns (bool success) {
      if (block.number <= endBlock + transferLockup && msg.sender!=founder) throw;
      return super.transferFrom(_from, _to, _value);
    }

    /**
     * Security review
     *
     * - TODO: Check gas limit we stay well below 230
     *
     */
    function() {
        buy();
    }

}
