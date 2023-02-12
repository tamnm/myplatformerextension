// Add your code here
namespace PlatformerItems {
    /**
     * Gets the "Type" of Effect
     */
    //% shim=KIND_GET
    //% blockId=effecttype block="$effect_type"
    //% kindNamespace=EffectTypes kindMemberName=EffectType
    export function _effectType(effect_type: number): number {
        return effect_type;
    }
  
}

namespace EffectTypes {
    let nextKind: number;

    export function create() {
        if (nextKind === undefined) nextKind = 1000;
        return nextKind++;
    }

    //% isKind
    export const Active = create();

    //% isKind
    export const Fire = create();
}