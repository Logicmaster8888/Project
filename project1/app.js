
// Formula https://forum.freecodecamp.org/t/help-needed-for-javascript-slot-machine/35370
// Sept 2016

<script>
    function runSlots() {
        var slotOne;
        var slotTwo;
        var slotThree;

        var images = []''
    
</script>// Formula https://forum.freecodecamp.org/t/guide-create-a-javascript-slot-machine/16819
// July 2016
slotOne = Math.floor(Math.random() * (3-1 +1)) + 1;
slotTwo = Math.floor(Math.random() * (3-1 +1)) + 1;
slotThree = Math.floor(Math.random() * (3-1 +1)) + 1;

if (slotOne !==undefined && slotTwo !== undefined && slotThree !== undefined) {
    $(".logger").html(slotOne + " " + slotTwo + " " + slotThree);

}

// Formula https://forum.freecodecamp.org/t/guide-add-your-javascript-slot-machine-slots/16652
// Jul 2016

if (slotOne ! = slotTwo || slotTwo !==slotThree) {
    return (null);
}

$(".logger").append(" Not A Win")
return [slotOne, slotTwo, slotThree];
}