# The National Geographic exercise

Three features written to the commitments in `docs/natgeo-preregistration.md`, following the
procedure in `docs/natgeo-process.md`. Written before consulting any real National Geographic
article on these subjects. The comparison happens afterwards.

## THESE ARE NOT REPORTING

Every one of these is an imagined feature. **All quoted speech is invented. All named
sources are invented characters**, including the scientists, conservators, guides, officials
and residents. No real living person is quoted anywhere in this directory, and nothing here
should be cited, excerpted or circulated as journalism.

Real historical figures and published findings appear as background only, restricted to
matters of public record: Howard Carter and Harry Burton in the Tutankhamun piece, the 1972
Marine Mammal Protection Act in the shark piece, the lidar surveys in the Amazon piece. The
underlying science is drawn from real published work and kept as accurate as I can make it.
The people walking around inside it are fiction.

Where a factual claim is uncertain or where I am compressing a live scholarly argument, the
assignment sheet says so.

## Images

**Nothing is generated.** The photo edits are written specifications only: no image-model
calls, no candidate files, no spend. Each frame is described as an assignment with its
technique, its job, and a caption.

## The three

| Slug | Brief |
| --- | --- |
| `tutankhamun-centenary` | King Tut's tomb, 100 years on |
| `shark-attacks` | Shark attacks |
| `amazon-hidden-civilisations` | Hidden civilisations of the Amazon |

## Per feature

    00-assignment.md   peg, nut graf, cast, quote bank, fact dossier, chain, G/A map, budget
    feature.md         the draft
    photo-edit.md      8-12 frames, specified not shot
    notes.md           which commitments I fought, written after drafting

## Checking

    node scripts/check_feature.mjs natgeo-exercise/<slug>/feature.md

Measures against predictions P1-P12. **Do not run `npm run prose` on these.** That enforces
Barley & Bronze house style, whose ten-word sentences and em-dash ban would wreck a magazine
feature, and using it here is the exact failure `docs/natgeo-process.md` Rule 0 exists to
prevent.
