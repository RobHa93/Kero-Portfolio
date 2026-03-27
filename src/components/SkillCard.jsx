import PropTypes from 'prop-types';

const SkillCard = ({ imgSrc, label, desc, classes }) => {
  return (
    <div
      className={`group flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/8 hover:border-emerald-400/30 transition-all duration-300 ${classes || ''}`}
    >
      <figure className="flex-shrink-0 bg-zinc-800 rounded-lg overflow-hidden w-12 h-12 p-2.5 group-hover:bg-zinc-700 transition-colors duration-300">
        <img
          src={imgSrc}
          width={32}
          height={32}
          alt={label}
          className="w-full h-full object-contain"
        />
      </figure>
      <div>
        <h3 className="text-white font-medium text-sm">{label}</h3>
        <p className="text-zinc-500 text-xs mt-0.5">{desc}</p>
      </div>
    </div>
  );
};

SkillCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  classes: PropTypes.string,
};

export default SkillCard;