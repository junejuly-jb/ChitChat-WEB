export const shouldShowAvatar = (previous, msg) => {
    const isFirst = !previous;
    
    if(isFirst) return true
    
    const differentUser = msg.sender !== previous.sender;
    if(differentUser) return true;
    
    return false
}