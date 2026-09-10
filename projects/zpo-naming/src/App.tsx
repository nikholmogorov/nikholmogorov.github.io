import { useState, useMemo, useCallback } from 'react';
import Fieldset from './components/Fieldset';
import { FIELDSET_CONFIG, ALLOW_RULES, initialGroupsState } from './config';
import { useFloating, autoUpdate, offset, useHover, useRole, useInteractions, useTransitionStyles } from '@floating-ui/react';

interface GroupStateItem {
    selectedValue: string | null;
    customText: string;
}

type GroupsState = Record<string, GroupStateItem>;

const EMPTY_SET = new Set<string>();

export default function App() {
    const [groupsState, setGroupsState] =
        useState<GroupsState>(initialGroupsState);
    const [isOpenTooltip, setIsOpenTooltip] = useState(false);

    const disabledMap = useMemo(() => {
        const map: Record<string, Set<string>> = {};

        FIELDSET_CONFIG.forEach(({ groupName, options }) => {
            map[groupName] = new Set<string>();

            options.forEach((opt) => {
                let isCompatible = false;

                for (const [typeKey, rulesObj] of Object.entries(ALLOW_RULES)) {
                    const rules = rulesObj as Record<string, string[]>;

                    if (groupName === `type`) {
                        if (typeKey !== opt.value) continue;
                    } else {
                        if (!rules[groupName] || !rules[groupName].includes(opt.value))
                            continue;
                    }

                    let matchesAllOtherSelections = true;
                    for (const config of FIELDSET_CONFIG) {
                        const checkGroup = config.groupName;
                        if (checkGroup === groupName) continue;

                        const selectedVal = groupsState[checkGroup]?.selectedValue;
                        if (!selectedVal) continue;

                        if (checkGroup === `type`) {
                            if (typeKey !== selectedVal) {
                                matchesAllOtherSelections = false;
                                break;
                            }
                        } else {
                            const checkRules = rules[checkGroup];
                            if (!checkRules || !checkRules.includes(selectedVal)) {
                                matchesAllOtherSelections = false;
                                break;
                            }
                        }
                    }

                    if (typeKey === `2АВГ` && matchesAllOtherSelections) {
                        const activePipe =
                            groupName === `pipePerSection`
                                ? opt.value
                                : groupsState.pipePerSection?.selectedValue;
                        const activePassage =
                            groupName === `passage`
                                ? opt.value
                                : groupsState.passage?.selectedValue;

                        if (activePipe && activePassage) {
                            if (
                                activePipe === `4` &&
                                ![`1`, `2`, `4`].includes(activePassage)
                            ) {
                                matchesAllOtherSelections = false;
                            }
                            if (
                                activePipe === `6` &&
                                ![`1`, `2`, `3`, `6`].includes(activePassage)
                            ) {
                                matchesAllOtherSelections = false;
                            }
                        }
                    }

                    if (matchesAllOtherSelections) {
                        isCompatible = true;
                        break;
                    }
                }

                if (!isCompatible) {
                    map[groupName].add(opt.value);
                }
            });
        });
        return map;
    }, [groupsState]);

    const handleRadioChange = useCallback((groupName: string, value: string) => {
        setGroupsState((prev) => {
            if (groupName === 'type') {
                const newRules =
                    (ALLOW_RULES as Record<string, Record<string, string[]>>)[value] || {};

                const nextState: GroupsState = { ...prev };
                nextState.type = { selectedValue: value, customText: '' };

                Object.keys(nextState).forEach((key) => {
                    if (key === 'type') return;

                    const allowed = newRules[key];
                    const currentVal = nextState[key]?.selectedValue;

                    if (currentVal && allowed && !allowed.includes(currentVal)) {
                        nextState[key] = {
                            ...nextState[key],
                            selectedValue: null,
                        };
                    }
                });
                return nextState;
            }

            return {
                ...prev,
                [groupName]: {
                    ...prev[groupName],
                    selectedValue: value,
                    customText: '',
                },
            };
        });
    }, []);

    const handleTextChange = useCallback((groupName: string, text: string) => {
        setGroupsState((prev) => ({
            ...prev,
            [groupName]: {
                selectedValue: text !== '' ? null : prev[groupName]?.selectedValue,
                customText: text,
            },
        }));
    }, []);

    const resultString = useMemo(() => {
        const res = FIELDSET_CONFIG.reduce<Record<string, string>>((acc, item) => {
            const field = groupsState[item.groupName];
            const disabledSet = disabledMap[item.groupName] || EMPTY_SET;

            const allOptionsDisabled =
                item.options.length > 0 &&
                item.options.every((opt) => disabledSet.has(opt.value));

            if (allOptionsDisabled) {
                acc[item.groupName] = ``;
            } else {
                acc[item.groupName] = field?.selectedValue || field?.customText || `?`;
            }
            return acc;
        }, {});

        const {
            type: typeRes,
            finning: finningRes,
            blinds: blindsRes,
            pressure: pressureRes,
            matExec: matExecRes,
            fan: fanRes,
            pipePerSection: pipePerSectionRes,
            passage: passageRes,
            ribPipeLength: ribPipeLengthRes,
            climate: climateRes,
        } = res;

        const firstPart =
            [typeRes, finningRes, blindsRes, pressureRes, matExecRes, fanRes]
                .filter((item) => item && item.trim() !== `` && item !== `?`)
                .join(`-`) || `???`;

        const secondPart =
            [pipePerSectionRes, passageRes, ribPipeLengthRes, climateRes]
                .filter((item) => item && item.trim() !== `` && item !== `?`)
                .join(`-`) || `???`;

        const result = `${firstPart} / ${secondPart} ТУ-28.25.11.110-267-75429092-2019`;
        return result;
    }, [groupsState, disabledMap]);

    const handleCopyResult = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await navigator.clipboard.writeText(resultString);
    };

    const { refs, floatingStyles, context } = useFloating({
        placement: `top`,
        open: isOpenTooltip,
        onOpenChange: setIsOpenTooltip,
        middleware: [offset(8)],
        whileElementsMounted: autoUpdate,
    });

    const hover = useHover(context);
    const role = useRole(context, { role: `tooltip` });

    const { getReferenceProps, getFloatingProps } = useInteractions([hover, role,]);

    const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
        duration: 200,
        initial: {
            opacity: 0,
        },
        open: {
            opacity: 1,
        },
        close: {
            opacity: 0,
        },
    });

    return (
        <div className="container">
            <form className="form">
                <h1 className="form__title">Обозначение АВО</h1>
                <div className="form__inner">
                    {FIELDSET_CONFIG.map((config) => (
                        <Fieldset
                            key={config.groupName}
                            groupName={config.groupName}
                            label={config.label}
                            options={config.options}
                            selectedValue={
                                groupsState[config.groupName]?.selectedValue ?? null
                            }
                            customText={groupsState[config.groupName]?.customText ?? ``}
                            disabledValues={disabledMap[config.groupName] || EMPTY_SET}
                            helpImageSrc={config.helpImageSrc}
                            onRadioChange={handleRadioChange}
                            onTextChange={handleTextChange}
                        />
                    ))}
                    <div className="form__result-wrapper">
                        <button
                            className="form__result-button"
                            onClick={(e) => handleCopyResult(e)}
                            type="button"
                            ref={refs.setReference}
                            {...getReferenceProps()}
                        >
                            {resultString}
                        </button>
                        {isMounted && (
                            <div
                                className="form__result-tooltip"
                                ref={refs.setFloating}
                                style={{
                                    ...floatingStyles,
                                    ...transitionStyles,
                                }}
                                {...getFloatingProps()}
                            >
                                Нажмите для копирования
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};